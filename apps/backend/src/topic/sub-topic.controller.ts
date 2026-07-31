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
import type { CreateSubTopicDto } from './dto/create-sub-topic.dto';
import type { UpdateSubTopicDto } from './dto/update-sub-topic.dto';
import { TopicService } from './topic.service';

@ApiTags('sub-topics')
@Controller('sub-topics')
export class SubTopicController {
  constructor(private readonly topics: TopicService) {}
  @Get() @ApiOkResponse({ description: 'Lists sub-topics.' }) findAll() {
    return this.topics.findAllSubTopics();
  }
  @Get(':id') @ApiOkResponse({ description: 'Returns a sub-topic.' }) findOne(
    @Param('id') id: string
  ) {
    return this.topics.findOneSubTopic(id);
  }
  @Post() @ApiCreatedResponse({ description: 'Creates a sub-topic.' }) create(
    @Body() data: CreateSubTopicDto
  ) {
    return this.topics.createSubTopic(data);
  }
  @Patch(':id') @ApiOkResponse({ description: 'Updates a sub-topic.' }) update(
    @Param('id') id: string,
    @Body() data: UpdateSubTopicDto
  ) {
    return this.topics.updateSubTopic(id, data);
  }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiNoContentResponse() async remove(
    @Param('id') id: string
  ): Promise<void> {
    await this.topics.removeSubTopic(id);
  }
}
