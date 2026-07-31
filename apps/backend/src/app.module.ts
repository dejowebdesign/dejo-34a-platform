import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { ImportModule } from './import/import.module';
import { LawModule } from './law/law.module';
import { ParagraphModule } from './paragraph/paragraph.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuizModule } from './quiz/quiz.module';
import { SearchModule } from './search/search.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().min(32).required(),
        PORT: Joi.number().port().default(3000)
      })
    }),
    PrismaModule,
    AuthModule,
    TopicModule,
    LawModule,
    ParagraphModule,
    ImportModule,
    SearchModule,
    QuizModule
  ]
})
export class AppModule {}
