import { Injectable, NotFoundException } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service';
import type { CreateParagraphDto } from './dto/create-paragraph.dto';
import type { CreateParagraphVersionDto } from './dto/create-paragraph-version.dto';
import type { UpdateParagraphDto } from './dto/update-paragraph.dto';
import type { UpdateParagraphVersionDto } from './dto/update-paragraph-version.dto';

@Injectable()
export class ParagraphService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.paragraph.findMany({
      include: { law: true, subTopic: true },
      orderBy: [{ law: { abbreviation: 'asc' } }, { number: 'asc' }]
    });
  }
  async findOne(id: string) {
    return this.requireParagraph(id);
  }
  create(data: CreateParagraphDto) {
    return this.prisma.paragraph.create({ data });
  }
  async update(id: string, data: UpdateParagraphDto) {
    await this.requireParagraph(id);
    return this.prisma.paragraph.update({ where: { id }, data });
  }
  async remove(id: string) {
    await this.requireParagraph(id);
    return this.prisma.paragraph.delete({ where: { id } });
  }

  findAllVersions(paragraphId?: string) {
    return this.prisma.paragraphVersion.findMany({
      where: paragraphId ? { paragraphId } : undefined,
      include: { paragraph: true },
      orderBy: { importedAt: 'desc' }
    });
  }
  async findOneVersion(id: string) {
    return this.requireVersion(id);
  }
  createVersion(data: CreateParagraphVersionDto) {
    return this.prisma.paragraphVersion.create({
      data: { ...data, importedAt: data.importedAt ? new Date(data.importedAt) : undefined }
    });
  }
  async updateVersion(id: string, data: UpdateParagraphVersionDto) {
    await this.requireVersion(id);
    const { importedAt, ...rest } = data;
    return this.prisma.paragraphVersion.update({
      where: { id },
      data: { ...rest, ...(importedAt ? { importedAt: new Date(importedAt) } : {}) }
    });
  }
  async removeVersion(id: string) {
    await this.requireVersion(id);
    return this.prisma.paragraphVersion.delete({ where: { id } });
  }

  private async requireParagraph(id: string) {
    const paragraph = await this.prisma.paragraph.findUnique({
      where: { id },
      include: { law: true, subTopic: true, versions: { orderBy: { importedAt: 'desc' } } }
    });
    if (!paragraph) throw new NotFoundException('Paragraph not found');
    return paragraph;
  }
  private async requireVersion(id: string) {
    const version = await this.prisma.paragraphVersion.findUnique({
      where: { id },
      include: { paragraph: true }
    });
    if (!version) throw new NotFoundException('Paragraph version not found');
    return version;
  }
}
