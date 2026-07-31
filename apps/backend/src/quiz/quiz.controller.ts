import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { QuizService } from './quiz.service';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizzes: QuizService) {}
  @Get()
  @ApiOkResponse({ description: 'Returns configured quizzes.' })
  findAll() {
    return this.quizzes.findAll();
  }
}
