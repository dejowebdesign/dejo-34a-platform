import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import type { CreateParagraphVersionDto } from './dto/create-paragraph-version.dto';
import type { UpdateParagraphVersionDto } from './dto/update-paragraph-version.dto';
import { ParagraphService } from './paragraph.service';

@ApiTags('paragraph-versions')
@Controller('paragraph-versions')
export class ParagraphVersionController {
  constructor(private readonly paragraphs: ParagraphService) {}
  @Get()
  @ApiQuery({ name: 'paragraphId', required: false })
  @ApiOkResponse({ description: 'Lists paragraph versions, optionally for one paragraph.' })
  findAll(@Query('paragraphId') paragraphId?: string) {
    return this.paragraphs.findAllVersions(paragraphId);
  }
  @Get(':id') @ApiOkResponse({ description: 'Returns a paragraph version.' }) findOne(
    @Param('id') id: string
  ) {
    return this.paragraphs.findOneVersion(id);
  }
  @Post() @ApiCreatedResponse({ description: 'Creates a paragraph version.' }) create(
    @Body() data: CreateParagraphVersionDto
  ) {
    return this.paragraphs.createVersion(data);
  }
  @Patch(':id') @ApiOkResponse({ description: 'Updates a paragraph version.' }) update(
    @Param('id') id: string,
    @Body() data: UpdateParagraphVersionDto
  ) {
    return this.paragraphs.updateVersion(id, data);
  }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiNoContentResponse() async remove(
    @Param('id') id: string
  ): Promise<void> {
    await this.paragraphs.removeVersion(id);
  }
}
