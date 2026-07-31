import { ImportJobStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateImportJobDto {
  @ApiProperty() @IsString() lawId!: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() startedAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() finishedAt?: string;
  @ApiProperty({ enum: ImportJobStatus, enumName: 'ImportJobStatus' })
  @IsEnum(ImportJobStatus)
  status!: ImportJobStatus;
  @ApiPropertyOptional({ minimum: 0 }) @IsOptional() @IsInt() @Min(0) importedParagraphs?: number;
  @ApiPropertyOptional({ minimum: 0 }) @IsOptional() @IsInt() @Min(0) changedParagraphs?: number;
  @ApiPropertyOptional({ minimum: 0 }) @IsOptional() @IsInt() @Min(0) deletedParagraphs?: number;
  @ApiPropertyOptional({ description: 'Elapsed execution time in milliseconds.' })
  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() message?: string;
}
