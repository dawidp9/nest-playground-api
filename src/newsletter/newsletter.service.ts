import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsletterAddressEntity } from '../entities/newsletter_address.entity';
import { NewsletterAddressDto } from '../dto/newsletter/newsletter_address.dto';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterAddressEntity)
    private newsletterAddressRepository: Repository<NewsletterAddressEntity>,
    private readonly mailerService: MailerService,
  ) {}

  async findAll(): Promise<[NewsletterAddressEntity[], number]> {
    return await this.newsletterAddressRepository.findAndCount();
  }

  async findOneById(id: number): Promise<NewsletterAddressEntity> {
    const address = await this.newsletterAddressRepository.findOne({
      id,
    });
    if (!address) throw new NotFoundException();

    return address;
  }

  async deleteOneById(id: number): Promise<boolean> {
    const response = await this.newsletterAddressRepository.delete({
      id,
    });
    const { affected } = response;
    if (!affected) throw new NotFoundException();

    return true;
  }

  async create(surveyDto: NewsletterAddressDto): Promise<boolean> {
    const { email, username } = surveyDto;

    const findEmail = await this.newsletterAddressRepository.findOne({ email });
    if (findEmail) throw new HttpException('Email already exist', 409);

    const surveyEntity = surveyDto.toEntity();
    await this.newsletterAddressRepository.insert(surveyEntity);

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
