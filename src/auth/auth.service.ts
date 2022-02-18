import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user/user.dto';
import { UserPayload } from '../dto/user/user_payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('AuthService validateUser', email, password);
    const userEntity = await this.usersService.findOneByEmail(email);

    console.log('validateUser userEntity', userEntity);

    if (userEntity) {
      const match = await bcrypt.compare(password, userEntity.password);
      if (match)
        return {
          email: userEntity.email,
          id: userEntity.id,
          roles: userEntity.roles,
        };
    }
    return null;
  }

  async register(userDto: UserDto): Promise<boolean> {
    await this.usersService.create(userDto);
    return true;
  }

  async login(user: any): Promise<any> {
    const payload: UserPayload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    console.log('login payload', payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
