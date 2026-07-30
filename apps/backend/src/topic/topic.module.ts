import { Module } from '@nestjs/common';
import { SubTopicController } from './sub-topic.controller';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({ controllers: [TopicController, SubTopicController], providers: [TopicService] })
export class TopicModule {}
