import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParagraphService } from './paragraph.service';

@ApiTags('paragraphs')
@Controller('paragraphs')
export class ParagraphController {
  constructor(private readonly paragraphs: ParagraphService) {}
  @Get(':id')
  @ApiOkResponse({ description: 'Returns one paragraph.' })
  findOne(@Param('id') id: string) { return this.paragraphs.findOne(id); }
}

