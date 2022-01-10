import { Injectable } from '@nestjs/common';
import { User } from '../dto/user/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(userData: any): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const userId = Date.now();

    this.users.push({
      userId,
      email: userData.email,
      password: hashedPassword,
    });

    console.log('users', this.users);
    return true;
  }
}
