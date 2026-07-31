import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}
  find(query: string) {
    return this.prisma.paragraph.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { currentText: { contains: query, mode: 'insensitive' } },
          { number: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: 25,
      select: { id: true, number: true, title: true, law: { select: { abbreviation: true } } }
    });
  }
}
