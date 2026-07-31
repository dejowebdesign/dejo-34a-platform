import { Injectable, NotFoundException } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service';
import type { CreateLawDto } from './dto/create-law.dto';
import type { UpdateLawDto } from './dto/update-law.dto';

@Injectable()
export class LawService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.law.findMany({ orderBy: { abbreviation: 'asc' } });
  }
  async findOne(id: string) {
    return this.requireLaw(id);
  }
  create(data: CreateLawDto) {
    return this.prisma.law.create({ data });
  }
  async update(id: string, data: UpdateLawDto) {
    await this.requireLaw(id);
    return this.prisma.law.update({ where: { id }, data });
  }
  async remove(id: string) {
    await this.requireLaw(id);
    return this.prisma.law.delete({ where: { id } });
  }
  private async requireLaw(id: string) {
    const law = await this.prisma.law.findUnique({ where: { id } });
    if (!law) throw new NotFoundException('Law not found');
    return law;
  }
}
