import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LawService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.law.findMany({ orderBy: { shortName: 'asc' } }); }
}

