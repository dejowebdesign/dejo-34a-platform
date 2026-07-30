import { Module } from '@nestjs/common';
import { ParagraphController } from './paragraph.controller';
import { ParagraphService } from './paragraph.service';

@Module({ controllers: [ParagraphController], providers: [ParagraphService] })
export class ParagraphModule {}

