import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LawService } from './law.service';

@ApiTags('laws')
@Controller('laws')
export class LawController {
  constructor(private readonly laws: LawService) {}
  @Get()
  @ApiOkResponse({ description: 'Returns imported laws.' })
  findAll() { return this.laws.findAll(); }
}

