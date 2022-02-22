import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interface/auth.interface';
import { JwtTokenDto } from '../dto/auth/jwt-token.dto';
import { UserCredentialsDto } from '../dto/user/user-credentials.dto';
import { BooleanResponseDto } from '../dto/common/boolean-response.dto';
import { TOKEN_TYPE, TokenEntity } from '../entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokensRepository: Repository<TokenEntity>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userEntity = await this.usersService.findOneByEmail(email);

    if (!userEntity) return null;
    const match = await bcrypt.compare(password, userEntity.password);
    if (match)
      return {
        id: userEntity.id,
        email: userEntity.email,
      };

    return null;
  }

  async removeAllRefreshTokens(userId: number) {
    const userEntity = await this.usersService.findOneById(userId);

    if (!userEntity) throw new UnauthorizedException();
    await this.tokensRepository.delete({
      owner: userEntity,
      type: TOKEN_TYPE.REFRESH,
    });

    return userEntity;
  }

  async saveRefreshToken(refreshToken: string, userId: number) {
    const userEntity = await this.removeAllRefreshTokens(userId);
    const salt = await bcrypt.genSalt(10);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    const tokenEntity = new TokenEntity();
    tokenEntity.token = hashedRefreshToken;
    tokenEntity.type = TOKEN_TYPE.REFRESH;
    tokenEntity.owner = userEntity;

    await this.tokensRepository.save(tokenEntity);

    return true;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const userEntity = await this.usersService.findOneById(userId, true);

    if (!userEntity) throw new UnauthorizedException();
    const realRefreshToken = await this.tokensRepository.findOne({
      owner: userEntity,
      type: TOKEN_TYPE.REFRESH,
    });

    if (!realRefreshToken) return null;
    const match = await bcrypt.compare(refreshToken, realRefreshToken.token);

    if (match) return userEntity;
    return null;
  }

  async register(userCredentialsDto: UserCredentialsDto): Promise<boolean> {
    await this.usersService.create(userCredentialsDto);
    return true;
  }

  async getJWTokens(user: UserPayload): Promise<JwtTokenDto> {
    const accessToken = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
    });

    await this.saveRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(user: UserPayload): Promise<BooleanResponseDto> {
    const { id } = user;
    await this.removeAllRefreshTokens(id);

    return { success: true };
  }
}
