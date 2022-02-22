import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtRefreshTokenDto implements Readonly<JwtRefreshTokenDto> {
  @ApiProperty()
  @IsJWT()
  refreshToken: string;
}
