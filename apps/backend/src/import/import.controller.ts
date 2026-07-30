import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ImportService } from './import.service';

@ApiTags('imports')
@Controller('imports')
export class ImportController {
  constructor(private readonly imports: ImportService) {}
  @Get('status')
  @ApiOkResponse({ description: 'Returns the importer infrastructure status.' })
  status() { return this.imports.status(); }
}

