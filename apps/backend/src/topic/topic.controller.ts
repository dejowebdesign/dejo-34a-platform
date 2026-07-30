import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TopicService } from './topic.service';

@ApiTags('topics')
@Controller('topics')
export class TopicController {
  constructor(private readonly topics: TopicService) {}
  @Get()
  @ApiOkResponse({ description: 'Returns configured topics.' })
  findAll() { return this.topics.findAll(); }
}

