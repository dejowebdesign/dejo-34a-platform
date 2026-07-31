import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateParagraphVersionDto {
  @ApiProperty() @IsString() paragraphId!: string;
  @ApiProperty() @IsString() @MaxLength(100) version!: string;
  @ApiProperty() @IsString() text!: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() importedAt?: string;
}
