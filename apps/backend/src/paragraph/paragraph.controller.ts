import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { CreateParagraphDto } from './dto/create-paragraph.dto';
import type { UpdateParagraphDto } from './dto/update-paragraph.dto';
import type { ParagraphService } from './paragraph.service';

@ApiTags('paragraphs')
@Controller('paragraphs')
export class ParagraphController {
  constructor(private readonly paragraphs: ParagraphService) {}
  @Get() @ApiOkResponse({ description: 'Lists paragraphs.' }) findAll() {
    return this.paragraphs.findAll();
  }
  @Get(':id') @ApiOkResponse({ description: 'Returns a paragraph and version history.' }) findOne(
    @Param('id') id: string
  ) {
    return this.paragraphs.findOne(id);
  }
  @Post() @ApiCreatedResponse({ description: 'Creates a paragraph.' }) create(
    @Body() data: CreateParagraphDto
  ) {
    return this.paragraphs.create(data);
  }
  @Patch(':id') @ApiOkResponse({ description: 'Updates a paragraph.' }) update(
    @Param('id') id: string,
    @Body() data: UpdateParagraphDto
  ) {
    return this.paragraphs.update(id, data);
  }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiNoContentResponse() async remove(
    @Param('id') id: string
  ): Promise<void> {
    await this.paragraphs.remove(id);
  }
}
