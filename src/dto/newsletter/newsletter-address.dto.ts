import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NewsletterAddressEntity } from '../../entities/newsletter-address.entity';

export class NewsletterAddressDto implements Readonly<NewsletterAddressDto> {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(3, 99)
  username: string;

  public toEntity() {
    const it = new NewsletterAddressEntity();
    it.email = this.email;
    it.username = this.username;
    it.createDateTime = new Date();
    return it;
  }
}
