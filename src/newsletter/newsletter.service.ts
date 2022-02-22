import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsletterAddressEntity } from '../entities/newsletter-address.entity';
import { NewsletterAddressDto } from '../dto/newsletter/newsletter-address.dto';

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

  async create(newsletterAddressDto: NewsletterAddressDto): Promise<boolean> {
    const { email, username } = newsletterAddressDto;

    const findEmail = await this.newsletterAddressRepository.findOne({ email });
    if (findEmail) throw new HttpException('Email already exist', 409);

    await this.mailerService.sendMail({
      from: process.env.MAIL_ADDRESS,
      to: email,
      subject: 'Thank you for subscribing',
      template: 'newsletter-sing-in',
      context: {
        username: username.trim(),
      },
    });

    const newsletterAddressEntity = newsletterAddressDto.toEntity();
    await this.newsletterAddressRepository.insert(newsletterAddressEntity);

    return true;
  }
}
