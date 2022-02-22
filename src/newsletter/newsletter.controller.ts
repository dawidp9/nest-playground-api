import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import AuthRoleGuard from '../auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ROLE } from '../entities/role.entity';
import {
  ApiBadRequestExceptionResponse,
  ApiConflictExceptionResponse,
  ApiForbiddenExceptionResponse,
  ApiNotFoundExceptionResponse,
  ApiUnauthorizedExceptionResponse,
} from '../decorators/exceptions.decorator';
import { BooleanResponseDto } from '../dto/common/boolean-response.dto';
import { NewsletterAddressesResponseDto } from '../dto/newsletter/newsletter-addresses-response.dto';
import { NewsletterAddressDto } from '../dto/newsletter/newsletter-address.dto';
import { NewsletterAddressEntity } from '../entities/newsletter-address.entity';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Get('addresses')
  @UseGuards(AuthRoleGuard(ROLE.ADMIN))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'All newsletter addresses',
    type: NewsletterAddressesResponseDto,
  })
  @ApiUnauthorizedExceptionResponse()
  @ApiForbiddenExceptionResponse()
  async getAllAddresses(): Promise<NewsletterAddressesResponseDto> {
    const [addresses, count] = await this.newsletterService.findAll();
    return { count, addresses };
  }

  @Get('addresses/:id')
  @UseGuards(AuthRoleGuard(ROLE.ADMIN))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Newsletter addresses',
    type: NewsletterAddressEntity,
  })
  @ApiNotFoundExceptionResponse()
  @ApiUnauthorizedExceptionResponse()
  @ApiForbiddenExceptionResponse()
  @ApiBadRequestExceptionResponse()
  async getAddressById(
    @Param('id') id: number,
  ): Promise<NewsletterAddressEntity> {
    if (!+id) throw new BadRequestException('Invalid id param');

    return await this.newsletterService.findOneById(+id);
  }

  @Delete('addresses/:id')
  @UseGuards(AuthRoleGuard(ROLE.ADMIN))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete newsletter addresses',
    type: BooleanResponseDto,
  })
  @ApiNotFoundExceptionResponse()
  @ApiUnauthorizedExceptionResponse()
  @ApiForbiddenExceptionResponse()
  @ApiBadRequestExceptionResponse()
  async deleteAddressById(
    @Param('id') id: number,
  ): Promise<BooleanResponseDto> {
    if (!+id) throw new BadRequestException('Invalid id param');

    return { success: await this.newsletterService.deleteOneById(+id) };
  }

  @Post('addresses')
  @ApiBody({
    description: 'Newsletter address',
    type: NewsletterAddressDto,
  })
  @ApiCreatedResponse({
    description: 'Added newsletter address',
    type: BooleanResponseDto,
  })
  @ApiConflictExceptionResponse()
  @ApiBadRequestExceptionResponse()
  async create(
    @Body() surveyDto: NewsletterAddressDto,
  ): Promise<BooleanResponseDto> {
    return { success: await this.newsletterService.create(surveyDto) };
  }
}
