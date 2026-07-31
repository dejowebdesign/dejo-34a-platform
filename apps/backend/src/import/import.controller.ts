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
  ApiOperation,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import type { CreateImportJobDto } from './dto/create-import-job.dto';
import type { ManualImportDto } from './dto/manual-import.dto';
import type { UpdateImportJobDto } from './dto/update-import-job.dto';
import type { ImportService } from './import.service';

@ApiTags('import-jobs')
@Controller('import-jobs')
export class ImportController {
  constructor(private readonly imports: ImportService) {}
  @Get() @ApiOkResponse({ description: 'Lists import job records.' }) findAll() {
    return this.imports.findAll();
  }
  @Get('status')
  @ApiOkResponse({ description: 'Returns current and recent import status.' })
  status() {
    return this.imports.status();
  }
  @Get('history')
  @ApiQuery({ name: 'lawId', required: false })
  @ApiOkResponse({ description: 'Returns import history, optionally for one law.' })
  history(@Query('lawId') lawId?: string) {
    return this.imports.history(lawId);
  }
  @Post('manual')
  @ApiOperation({ summary: 'Imports one law from its official XML or XML ZIP source.' })
  @ApiCreatedResponse({
    description: 'Runs a synchronous official XML import and returns its job record.'
  })
  manual(@Body() data: ManualImportDto) {
    return this.imports.importManually(data);
  }
  @Get(':id') @ApiOkResponse({ description: 'Returns an import job record.' }) findOne(
    @Param('id') id: string
  ) {
    return this.imports.findOne(id);
  }
  @Post()
  @ApiCreatedResponse({
    description: 'Creates an import job record; it does not start an importer.'
  })
  create(@Body() data: CreateImportJobDto) {
    return this.imports.create(data);
  }
  @Patch(':id') @ApiOkResponse({ description: 'Updates an import job record.' }) update(
    @Param('id') id: string,
    @Body() data: UpdateImportJobDto
  ) {
    return this.imports.update(id, data);
  }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiNoContentResponse() async remove(
    @Param('id') id: string
  ): Promise<void> {
    await this.imports.remove(id);
  }
}
