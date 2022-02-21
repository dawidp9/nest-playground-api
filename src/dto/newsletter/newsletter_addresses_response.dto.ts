import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { NewsletterAddressEntity } from '../../entities/newsletter_address.entity';

export class NewsletterAddressesResponseDto
  implements Readonly<NewsletterAddressesResponseDto>
{
  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiModelProperty({ type: [NewsletterAddressEntity] })
  addresses: NewsletterAddressEntity[];
}
