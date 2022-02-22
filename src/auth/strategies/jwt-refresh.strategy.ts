import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserPayload } from '../interface/auth.interface';
import { JwtStrategyPayload } from './jwt.strategy';
import { forEach } from 'lodash';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: JwtStrategyPayload,
  ): Promise<UserPayload> {
    const refreshToken = request.body['refreshToken'];
    if (!refreshToken) throw new BadRequestException();

    const userEntity = await this.authService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.id,
    );

    if (!userEntity) throw new UnauthorizedException();
    const { id, email } = userEntity;

    const userRoles = [];
    forEach(userEntity.roles, (item) => userRoles.push(item.role));

    return { id, email, roles: userRoles };
  }
}
