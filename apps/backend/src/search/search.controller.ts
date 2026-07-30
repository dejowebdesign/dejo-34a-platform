import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { SearchService } from './search.service';

class SearchQueryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  q!: string;
}

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly search: SearchService) {}
  @Get()
  @ApiQuery({ name: 'q', minLength: 2, maxLength: 100 })
  @ApiOkResponse({ description: 'Searches legal paragraphs.' })
  find(@Query() query: SearchQueryDto) { return this.search.find(query.q); }
}

