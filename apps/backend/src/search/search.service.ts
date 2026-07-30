import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}
  find(query: string) {
    return this.prisma.paragraph.findMany({
      where: { OR: [{ title: { contains: query, mode: 'insensitive' } }, { content: { contains: query, mode: 'insensitive' } }] },
      take: 25,
      select: { id: true, reference: true, title: true, law: { select: { shortName: true } } }
    });
  }
}

