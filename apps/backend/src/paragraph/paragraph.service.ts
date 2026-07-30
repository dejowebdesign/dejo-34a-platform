import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParagraphService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(id: string) {
    const paragraph = await this.prisma.paragraph.findUnique({ where: { id } });
    if (!paragraph) throw new NotFoundException('Paragraph not found');
    return paragraph;
  }
}
