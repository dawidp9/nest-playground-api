import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey } from '../dto/surey/survey';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async create(@Body() survey: Survey): Promise<boolean> {
    return this.surveyService.create(survey);
  }
}
