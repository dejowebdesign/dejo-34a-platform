import { PartialType } from '@nestjs/swagger';
import { CreateParagraphVersionDto } from './create-paragraph-version.dto';
export class UpdateParagraphVersionDto extends PartialType(CreateParagraphVersionDto) {}
