import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from '../entities/survey.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyEntity]),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.SMP_SERVER,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
      }),
    }),
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
