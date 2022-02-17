import { Controller, Get } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  async get(): Promise<string> {
    this.surveyService.example();
    return 'send mail';
  }
}
