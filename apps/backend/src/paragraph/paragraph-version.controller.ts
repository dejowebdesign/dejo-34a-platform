import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateParagraphVersionDto } from './dto/create-paragraph-version.dto';
import { UpdateParagraphVersionDto } from './dto/update-paragraph-version.dto';
import { ParagraphService } from './paragraph.service';

@ApiTags('paragraph-versions')
@Controller('paragraph-versions')
export class ParagraphVersionController {
  constructor(private readonly paragraphs: ParagraphService) {}
  @Get() @ApiOkResponse({ description: 'Lists paragraph versions.' }) findAll() { return this.paragraphs.findAllVersions(); }
  @Get(':id') @ApiOkResponse({ description: 'Returns a paragraph version.' }) findOne(@Param('id') id: string) { return this.paragraphs.findOneVersion(id); }
  @Post() @ApiCreatedResponse({ description: 'Creates a paragraph version.' }) create(@Body() data: CreateParagraphVersionDto) { return this.paragraphs.createVersion(data); }
  @Patch(':id') @ApiOkResponse({ description: 'Updates a paragraph version.' }) update(@Param('id') id: string, @Body() data: UpdateParagraphVersionDto) { return this.paragraphs.updateVersion(id, data); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiNoContentResponse() async remove(@Param('id') id: string): Promise<void> { await this.paragraphs.removeVersion(id); }
}

