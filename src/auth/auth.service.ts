import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interface/auth.interface';
import { JwtTokenDto } from '../dto/auth/jwt_token.dto';
import { UserCredentialsDto } from '../dto/user/user_credentials_dto';

@Injectable()
export class AuthService {
  constructor(
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

  async register(userCredentialsDto: UserCredentialsDto): Promise<boolean> {
    await this.usersService.create(userCredentialsDto);
    return true;
  }

  async login(user: UserPayload): Promise<JwtTokenDto> {
    const accessToken = await this.jwtService.signAsync(user);

    return {
      access_token: accessToken,
    };
  }
}
