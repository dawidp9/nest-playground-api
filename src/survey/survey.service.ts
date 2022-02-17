import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Survey } from '../dto/surey/survey';

@Injectable()
export class SurveyService {
  constructor(private readonly mailerService: MailerService) {}

  async create(survey: Survey): Promise<boolean> {
    await this.mailerService.sendMail({
      from: process.env.MAIL_ADDRESS,
      to: survey.email,
      subject: 'Dziękujemy za zapisanie się!',
      text: `Cześć ${survey.username.trim()}! Dziękujemy za zapisanie się. Zespół Pielęgniarka24`,
      html: `Cześć ${survey.username.trim()}!<br> Dziękujemy za zapisanie się. <br><br>Zespół Pielęgniarka24`,
    });

    return true;
  }
}
