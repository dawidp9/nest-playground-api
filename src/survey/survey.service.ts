import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SurveyService {
  constructor(private readonly mailerService: MailerService) {}

  public example(): void {
    this.mailerService
      .sendMail({
        from: 'info@pielegniarka24.eu',
        to: 'dawid.piwko.dp@gmail.com',
        subject: 'Testing nurse mailer',
        text: 'Hello nurse',
        html: '<b>Hello <h1>Nurse</h1></b>',
      })
      .then((res) => {
        console.log('Send', res);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  }
}
