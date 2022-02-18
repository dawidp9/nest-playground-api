import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyDto } from '../dto/surey/survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async create(@Body() surveyDto: SurveyDto): Promise<boolean> {
    return this.surveyService.create(surveyDto);
  }
}
