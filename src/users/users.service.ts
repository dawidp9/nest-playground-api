import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ROLE, RoleEntity } from '../entities/role.entity';
import { UserDto } from '../dto/user/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne(
      {
        email: email.trim().toLocaleLowerCase(),
      },
      { relations: ['roles'] },
    );
  }

  async create(userDto: UserDto): Promise<boolean> {
    const email = userDto.email.trim().toLocaleLowerCase();
    const password = userDto.password;

    const userExist = await this.usersRepository.findOne({
      email,
    });
    if (userExist) throw new HttpException('User already exist', 409);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userEntity = new UserEntity();
    userEntity.email = email;
    userEntity.password = hashedPassword;

    const role = await this.rolesRepository.findOne({ role: ROLE.USER });
    if (!role) {
      const userRoleEntity = new RoleEntity();
      userRoleEntity.id = 1;
      userRoleEntity.role = ROLE.USER;

      await this.rolesRepository.insert(userRoleEntity);
      userEntity.roles = [userRoleEntity];
    } else {
      userEntity.roles = [role];
    }
    await this.usersRepository.save(userEntity);

    return true;
  }
}
