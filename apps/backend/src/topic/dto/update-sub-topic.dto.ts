import { PartialType } from '@nestjs/swagger';
import { CreateSubTopicDto } from './create-sub-topic.dto';

export class UpdateSubTopicDto extends PartialType(CreateSubTopicDto) {}
