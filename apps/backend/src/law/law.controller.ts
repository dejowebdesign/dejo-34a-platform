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
import type { CreateLawDto } from './dto/create-law.dto';
import type { UpdateLawDto } from './dto/update-law.dto';
import type { LawService } from './law.service';

@ApiTags('laws')
@Controller('laws')
export class LawController {
  constructor(private readonly laws: LawService) {}
  @Get() @ApiOkResponse({ description: 'Lists laws.' }) findAll() {
    return this.laws.findAll();
  }
  @Get(':id') @ApiOkResponse({ description: 'Returns a law.' }) findOne(@Param('id') id: string) {
    return this.laws.findOne(id);
  }
  @Post() @ApiCreatedResponse({ description: 'Creates a law.' }) create(
    @Body() data: CreateLawDto
  ) {
    return this.laws.create(data);
  }
  @Patch(':id') @ApiOkResponse({ description: 'Updates a law.' }) update(
    @Param('id') id: string,
    @Body() data: UpdateLawDto
  ) {
    return this.laws.update(id, data);
  }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiNoContentResponse() async remove(
    @Param('id') id: string
  ): Promise<void> {
    await this.laws.remove(id);
  }
}
