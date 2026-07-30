import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateLawDto {
  @ApiProperty() @IsString() @MaxLength(30) abbreviation!: string;
  @ApiProperty() @IsString() @MaxLength(300) name!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(4000) description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) version?: string;
  @ApiPropertyOptional({ description: 'Canonical legal source URL.' }) @IsOptional() @IsUrl() @MaxLength(2000) source?: string;
}
