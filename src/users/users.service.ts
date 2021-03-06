import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ROLE, RoleEntity } from '../entities/role.entity';
import { UserCredentialsDto } from '../dto/user/user-credentials.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
  ) {}

  async findOneById(
    id: number,
    withRoles: boolean = false,
  ): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne(
      {
        id,
      },
      withRoles && {
        relations: ['roles'],
      },
    );
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne({
      email: email.trim().toLocaleLowerCase(),
    });
  }

  async create(userCredentialsDto: UserCredentialsDto): Promise<boolean> {
    const email = userCredentialsDto.email.trim().toLocaleLowerCase();
    const password = userCredentialsDto.password;

    const userExist = await this.findOneByEmail(email);
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
