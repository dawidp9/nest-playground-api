import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { forEach } from 'lodash';
import { UserPayload } from '../interface/auth.interface';
import { UsersService } from '../../users/users.service';

export interface JwtStrategyPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ id, email }: JwtStrategyPayload): Promise<UserPayload> {
    const userEntity = await this.usersService.findOneById(id, true);
    if (!userEntity) throw new UnauthorizedException();

    const userRoles = [];
    forEach(userEntity.roles, (item) => userRoles.push(item.role));

    return { id, email, roles: userRoles };
  }
}
