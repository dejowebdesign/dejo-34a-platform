import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateParagraphDto {
  @ApiProperty() @IsString() lawId!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() subTopicId?: string;
  @ApiProperty() @IsString() @MaxLength(100) number!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) title?: string;
  @ApiProperty() @IsString() currentText!: string;
  @ApiProperty() @IsString() @MaxLength(100) currentVersion!: string;
}
