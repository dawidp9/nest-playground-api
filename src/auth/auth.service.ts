import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('AuthService validateUser', email, password);
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) return { email: user.email, userId: user.userId };
    }
    return null;
  }

  async register(userData: any): Promise<boolean> {
    await this.usersService.create(userData);
    return true;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, userId: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
