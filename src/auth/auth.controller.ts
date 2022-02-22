import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard.service';
import { RequestWithUser } from './interface/auth.interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtTokenDto } from '../dto/auth/jwt-token.dto';
import { BooleanResponseDto } from '../dto/common/boolean-response.dto';
import { UserCredentialsDto } from '../dto/user/user-credentials.dto';
import { UserProfileDto } from '../dto/user/user-profile.dto';
import {
  ApiBadRequestExceptionResponse,
  ApiConflictExceptionResponse,
  ApiUnauthorizedExceptionResponse,
} from '../decorators/exceptions.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth-guard.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshTokenDto } from '../dto/auth/jwt-refresh-token.dto';

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
  @ApiCreatedResponse({
    description: 'JWT access and refresh token',
    type: JwtTokenDto,
  })
  @ApiUnauthorizedExceptionResponse()
  async login(
    @Request() req: RequestWithUser,
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<JwtTokenDto> {
    return this.authService.getJWTokens(req.user);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiBody({
    description: 'JWT refresh token',
    type: JwtRefreshTokenDto,
  })
  @ApiCreatedResponse({
    description: 'JWT access and refresh token',
    type: JwtTokenDto,
  })
  @ApiUnauthorizedExceptionResponse()
  async refresh(
    @Request() req: RequestWithUser,
    @Body() jwtRefreshTokenDto: JwtRefreshTokenDto,
  ): Promise<JwtTokenDto> {
    return this.authService.getJWTokens(req.user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: BooleanResponseDto,
  })
  @ApiUnauthorizedExceptionResponse()
  async logout(@Request() req: RequestWithUser): Promise<BooleanResponseDto> {
    return this.authService.logout(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserProfileDto })
  @ApiUnauthorizedExceptionResponse()
  async getProfile(@Request() req: RequestWithUser): Promise<UserProfileDto> {
    return req.user;
  }
}
