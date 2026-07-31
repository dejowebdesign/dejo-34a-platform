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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import type { CreateTopicDto } from './dto/create-topic.dto';
import type { UpdateTopicDto } from './dto/update-topic.dto';
import type { TopicService } from './topic.service';

@ApiTags('topics')
@Controller('topics')
export class TopicController {
  constructor(private readonly topics: TopicService) {}
  @Get() @ApiOkResponse({ description: 'Lists topics and their sub-topics.' }) findAll() {
    return this.topics.findAll();
  }
  @Get(':id') @ApiOkResponse({ description: 'Returns a topic.' }) findOne(@Param('id') id: string) {
    return this.topics.findOne(id);
  }
  @Post() @ApiCreatedResponse({ description: 'Creates a topic.' }) create(
    @Body() data: CreateTopicDto
  ) {
    return this.topics.create(data);
  }
  @Patch(':id') @ApiOkResponse({ description: 'Updates a topic.' }) update(
    @Param('id') id: string,
    @Body() data: UpdateTopicDto
  ) {
    return this.topics.update(id, data);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletes a topic.' })
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.topics.remove(id);
  }
}
