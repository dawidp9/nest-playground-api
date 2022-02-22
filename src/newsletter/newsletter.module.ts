import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { NewsletterAddressEntity } from '../entities/newsletter-address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsletterAddressEntity]),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.SMP_SERVER,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
        },
      }),
    }),
  ],
  providers: [NewsletterService],
  controllers: [NewsletterController],
})
export class NewsletterModule {}
