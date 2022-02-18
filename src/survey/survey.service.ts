import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SurveyDto } from '../dto/surey/survey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from '../entities/survey.entity';
import { Repository } from 'typeorm';
import { UserPayload } from '../dto/user/user_payload';
import { ROLE } from '../entities/role.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
    private readonly mailerService: MailerService,
  ) {}

  async findAll(user: UserPayload): Promise<SurveyEntity[]> {
    const hasPerms = user.roles.find((item) => item.role === ROLE.ADMIN);
    if (!hasPerms) throw new ForbiddenException();

    return await this.surveyRepository.find();
  }

  async create(surveyDto: SurveyDto): Promise<boolean> {
    const { email, username } = surveyDto;

    const findEmail = await this.surveyRepository.findOne({ email });
    if (findEmail) {
      throw new HttpException('Email already exist', 409);
    }

    const surveyEntity = surveyDto.toEntity();
    await this.surveyRepository.insert(surveyEntity);

    await this.mailerService.sendMail({
      from: process.env.MAIL_ADDRESS,
      to: email,
      subject: 'Dziękujemy za zapisanie się!',
      text: `Cześć ${username.trim()}! Dziękujemy za zapisanie się. Zespół Pielęgniarka24`,
      html: `Cześć ${username.trim()}!<br> Dziękujemy za zapisanie się. <br><br>Zespół Pielęgniarka24`,
    });

    return true;
  }
}
