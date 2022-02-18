import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyDto } from '../dto/surey/survey.dto';
import { SurveyEntity } from '../entities/survey.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(
    @Request() req,
  ): Promise<{ count: number; surveys: SurveyEntity[] }> {
    const surveys = await this.surveyService.findAll(req.user);
    return { count: surveys.length, surveys };
  }

  @Post()
  async create(@Body() surveyDto: SurveyDto): Promise<boolean> {
    return await this.surveyService.create(surveyDto);
  }
}
