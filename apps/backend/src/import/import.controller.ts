import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateImportJobDto } from './dto/create-import-job.dto';
import { UpdateImportJobDto } from './dto/update-import-job.dto';
import { ImportService } from './import.service';

@ApiTags('import-jobs')
@Controller('import-jobs')
export class ImportController {
  constructor(private readonly imports: ImportService) {}
  @Get() @ApiOkResponse({ description: 'Lists import job records. No importer is executed by this endpoint.' }) findAll() { return this.imports.findAll(); }
  @Get(':id') @ApiOkResponse({ description: 'Returns an import job record.' }) findOne(@Param('id') id: string) { return this.imports.findOne(id); }
  @Post() @ApiCreatedResponse({ description: 'Creates an import job record; it does not start an importer.' }) create(@Body() data: CreateImportJobDto) { return this.imports.create(data); }
  @Patch(':id') @ApiOkResponse({ description: 'Updates an import job record.' }) update(@Param('id') id: string, @Body() data: UpdateImportJobDto) { return this.imports.update(id, data); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiNoContentResponse() async remove(@Param('id') id: string): Promise<void> { await this.imports.remove(id); }
}

