import { Injectable } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.quiz.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
