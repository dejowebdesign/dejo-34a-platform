import { Injectable, NotFoundException } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service';
import type { CreateSubTopicDto } from './dto/create-sub-topic.dto';
import type { CreateTopicDto } from './dto/create-topic.dto';
import type { UpdateSubTopicDto } from './dto/update-sub-topic.dto';
import type { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.topic.findMany({
      include: { subTopics: { orderBy: { order: 'asc' } } },
      orderBy: { order: 'asc' }
    });
  }
  async findOne(id: string) {
    return this.requireTopic(id);
  }
  create(data: CreateTopicDto) {
    return this.prisma.topic.create({ data });
  }
  async update(id: string, data: UpdateTopicDto) {
    await this.requireTopic(id);
    return this.prisma.topic.update({ where: { id }, data });
  }
  async remove(id: string) {
    await this.requireTopic(id);
    return this.prisma.topic.delete({ where: { id } });
  }

  findAllSubTopics() {
    return this.prisma.subTopic.findMany({
      include: { topic: true },
      orderBy: [{ topic: { order: 'asc' } }, { order: 'asc' }]
    });
  }
  async findOneSubTopic(id: string) {
    return this.requireSubTopic(id);
  }
  createSubTopic(data: CreateSubTopicDto) {
    return this.prisma.subTopic.create({ data });
  }
  async updateSubTopic(id: string, data: UpdateSubTopicDto) {
    await this.requireSubTopic(id);
    return this.prisma.subTopic.update({ where: { id }, data });
  }
  async removeSubTopic(id: string) {
    await this.requireSubTopic(id);
    return this.prisma.subTopic.delete({ where: { id } });
  }

  private async requireTopic(id: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
      include: { subTopics: { orderBy: { order: 'asc' } } }
    });
    if (!topic) throw new NotFoundException('Topic not found');
    return topic;
  }

  private async requireSubTopic(id: string) {
    const subTopic = await this.prisma.subTopic.findUnique({
      where: { id },
      include: { topic: true }
    });
    if (!subTopic) throw new NotFoundException('Sub-topic not found');
    return subTopic;
  }
}
