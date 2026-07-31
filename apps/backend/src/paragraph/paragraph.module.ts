import { Module } from '@nestjs/common';
import { ParagraphVersionController } from './paragraph-version.controller';
import { ParagraphController } from './paragraph.controller';
import { ParagraphService } from './paragraph.service';
@Module({
  controllers: [ParagraphController, ParagraphVersionController],
  providers: [ParagraphService]
})
export class ParagraphModule {}
