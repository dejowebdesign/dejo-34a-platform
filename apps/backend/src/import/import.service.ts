import { Injectable, NotFoundException } from '@nestjs/common';
import { ImportJobStatus, Prisma } from '@prisma/client';
import { ChangeDetectionService, ImportService as LegalImportService, OfficialXmlSourceService, ParserService, SchedulerService, VersionService } from '@dejo/legal-import';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImportJobDto } from './dto/create-import-job.dto';
import { ManualImportDto } from './dto/manual-import.dto';
import { UpdateImportJobDto } from './dto/update-import-job.dto';

@Injectable()
export class ImportService {
  private readonly changes = new ChangeDetectionService();
  private readonly versions = new VersionService();
  private readonly scheduler = new SchedulerService();
  private readonly importer = new LegalImportService(new OfficialXmlSourceService(), new ParserService(), this.changes);

  constructor(private readonly prisma: PrismaService) {}

  findAll() { return this.prisma.importJob.findMany({ include: { law: true }, orderBy: { startedAt: 'desc' } }); }
  history(lawId?: string) { return this.prisma.importJob.findMany({ where: lawId ? { lawId } : undefined, include: { law: true }, orderBy: { startedAt: 'desc' } }); }
  async status() { return { schedulerEnabled: this.scheduler.isEnabled(), jobs: await this.prisma.importJob.findMany({ include: { law: true }, orderBy: { startedAt: 'desc' }, take: 20 }) }; }
  async findOne(id: string) { return this.requireJob(id); }
  create(data: CreateImportJobDto) { return this.prisma.importJob.create({ data: this.toCreatePersistence(data) }); }
  async update(id: string, data: UpdateImportJobDto) { await this.requireJob(id); return this.prisma.importJob.update({ where: { id }, data: this.toUpdatePersistence(data) }); }
  async remove(id: string) { await this.requireJob(id); return this.prisma.importJob.delete({ where: { id } }); }

  async importManually(request: ManualImportDto) {
    const law = await this.prisma.law.findUnique({ where: { id: request.lawId } });
    if (!law) throw new NotFoundException('Law not found');
    const sourceUrl = request.sourceUrl ?? law.source;
    if (!sourceUrl) throw new NotFoundException('No official XML source URL is configured for this law');
    const startedAt = new Date();
    const job = await this.prisma.importJob.create({ data: { lawId: law.id, status: ImportJobStatus.RUNNING, startedAt } });

    try {
      const { document, checksums } = await this.importer.load(sourceUrl);
      const importedAt = new Date();
      const version = this.versions.createVersionLabel(document.version, importedAt);
      const summary = await this.prisma.$transaction(async (transaction) => {
        const existing = await transaction.paragraph.findMany({ where: { lawId: law.id } });
        const existingByNumber = new Map(existing.map((paragraph) => [paragraph.number, paragraph]));
        let importedParagraphs = 0;
        let changedParagraphs = 0;

        for (const parsed of document.paragraphs) {
          const checksum = checksums.get(parsed.number);
          if (!checksum) continue;
          const current = existingByNumber.get(parsed.number);
          if (!current) {
            await transaction.paragraph.create({ data: { lawId: law.id, number: parsed.number, title: parsed.title, currentText: parsed.text, currentVersion: version, currentChecksum: checksum, sourceUrl, lastImportedAt: importedAt, versions: { create: { version, text: parsed.text, checksum, sourceUrl, importedAt } } } });
            importedParagraphs++;
          } else if (this.changes.hasChanged(current.currentChecksum, checksum)) {
            await transaction.paragraph.update({ where: { id: current.id }, data: { title: parsed.title, currentText: parsed.text, currentVersion: version, currentChecksum: checksum, sourceUrl, lastImportedAt: importedAt, versions: { create: { version, text: parsed.text, checksum, sourceUrl, importedAt } } } });
            changedParagraphs++;
          }
        }
        const deletedParagraphs = existing.filter((paragraph) => !checksums.has(paragraph.number)).length;
        return { importedParagraphs, changedParagraphs, deletedParagraphs };
      });

      return this.prisma.importJob.update({ where: { id: job.id }, data: { status: ImportJobStatus.COMPLETED, finishedAt: new Date(), duration: Date.now() - startedAt.getTime(), ...summary, warnings: summary.deletedParagraphs ? [`${summary.deletedParagraphs} paragraph(s) were absent from the source and retained for review.`] : document.warnings, message: 'Official XML import completed.' }, include: { law: true } });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown import error';
      return this.prisma.importJob.update({ where: { id: job.id }, data: { status: ImportJobStatus.FAILED, finishedAt: new Date(), duration: Date.now() - startedAt.getTime(), errors: [message], message: 'Official XML import failed.' }, include: { law: true } });
    }
  }

  private toCreatePersistence(data: CreateImportJobDto): Prisma.ImportJobUncheckedCreateInput {
    const { startedAt, finishedAt, ...rest } = data;
    return { ...rest, ...(startedAt ? { startedAt: new Date(startedAt) } : {}), ...(finishedAt ? { finishedAt: new Date(finishedAt) } : {}) };
  }
  private toUpdatePersistence(data: UpdateImportJobDto): Prisma.ImportJobUncheckedUpdateInput {
    const { startedAt, finishedAt, ...rest } = data;
    return { ...rest, ...(startedAt ? { startedAt: new Date(startedAt) } : {}), ...(finishedAt ? { finishedAt: new Date(finishedAt) } : {}) };
  }
  private async requireJob(id: string) {
    const job = await this.prisma.importJob.findUnique({ where: { id }, include: { law: true } });
    if (!job) throw new NotFoundException('Import job not found');
    return job;
  }
}
