import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { NewsletterAddressEntity } from '../entities/newsletter_address.entity';

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
      }),
    }),
  ],
  providers: [NewsletterService],
  controllers: [NewsletterController],
})
export class NewsletterModule {}
