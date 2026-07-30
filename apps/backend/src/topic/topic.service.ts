import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() { return this.prisma.topic.findMany({ orderBy: { position: 'asc' } }); }
}

