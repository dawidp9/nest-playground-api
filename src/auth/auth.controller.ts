import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interface/auth.interface';
import AuthRoleGuard from './guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtTokenDto } from '../dto/auth/jwt_token.dto';
import { BooleanResponseDto } from '../dto/common/boolean_response.dto';
import { UserCredentialsDto } from '../dto/user/user_credentials_dto';
import { UserProfileDto } from '../dto/user/user_prfile_dto';
import {
  ApiBadRequestExceptionResponse,
  ApiConflictExceptionResponse,
  ApiUnauthorizedExceptionResponse,
} from '../decorators/exceptions.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    description: 'User credentials',
    type: UserCredentialsDto,
  })
  @ApiCreatedResponse({ type: BooleanResponseDto })
  @ApiBadRequestExceptionResponse()
  @ApiConflictExceptionResponse()
  async register(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<BooleanResponseDto> {
    return { success: await this.authService.register(userCredentialsDto) };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    description: 'User credentials',
    type: UserCredentialsDto,
  })
  @ApiCreatedResponse({ description: 'JWT access token', type: JwtTokenDto })
  @ApiUnauthorizedExceptionResponse()
  async login(
    @Request() req: RequestWithUser,
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<JwtTokenDto> {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(AuthRoleGuard())
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserProfileDto })
  @ApiUnauthorizedExceptionResponse()
  async getProfile(@Request() req: RequestWithUser): Promise<UserProfileDto> {
    return req.user;
  }
}
