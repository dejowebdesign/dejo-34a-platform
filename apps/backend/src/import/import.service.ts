import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImportJobDto } from './dto/create-import-job.dto';
import { UpdateImportJobDto } from './dto/update-import-job.dto';

@Injectable()
export class ImportService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.importJob.findMany({ include: { law: true }, orderBy: { startedAt: 'desc' } }); }
  async findOne(id: string) { return this.requireJob(id); }
  create(data: CreateImportJobDto) { return this.prisma.importJob.create({ data: this.toPersistence(data) }); }
  async update(id: string, data: UpdateImportJobDto) { await this.requireJob(id); return this.prisma.importJob.update({ where: { id }, data: this.toPersistence(data) }); }
  async remove(id: string) { await this.requireJob(id); return this.prisma.importJob.delete({ where: { id } }); }

  private toPersistence(data: CreateImportJobDto | UpdateImportJobDto) {
    const { startedAt, finishedAt, ...rest } = data;
    return { ...rest, ...(startedAt ? { startedAt: new Date(startedAt) } : {}), ...(finishedAt ? { finishedAt: new Date(finishedAt) } : {}) };
  }
  private async requireJob(id: string) {
    const job = await this.prisma.importJob.findUnique({ where: { id }, include: { law: true } });
    if (!job) throw new NotFoundException('Import job not found');
    return job;
  }
}

