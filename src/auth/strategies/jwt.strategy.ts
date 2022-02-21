import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { forEach } from 'lodash';
import { UserPayload } from '../interface/auth.interface';

type JwtStrategyPayload = {
  id: number;
  email: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ id, email }: JwtStrategyPayload): Promise<UserPayload> {
    const userEntity = await this.usersRepository.findOne(
      { id },
      { relations: ['roles'] },
    );

    if (!userEntity) throw new UnauthorizedException();

    const userRoles = [];
    forEach(userEntity.roles, (item) => userRoles.push(item.role));

    return { id, email, roles: userRoles };
  }
}
