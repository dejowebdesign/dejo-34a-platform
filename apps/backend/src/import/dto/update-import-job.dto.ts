import { PartialType } from '@nestjs/swagger';
import { CreateImportJobDto } from './create-import-job.dto';
export class UpdateImportJobDto extends PartialType(CreateImportJobDto) {}

