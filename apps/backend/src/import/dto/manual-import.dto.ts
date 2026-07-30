import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class ManualImportDto {
  @ApiProperty({ description: 'Law identifier to update.' })
  @IsString()
  lawId!: string;

  @ApiPropertyOptional({ description: 'Official Gesetze-im-Internet XML or XML ZIP URL. Defaults to the law source.' })
  @IsOptional()
  @IsUrl()
  sourceUrl?: string;
}
