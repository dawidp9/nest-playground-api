import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto implements Readonly<JwtTokenDto> {
  @ApiProperty()
  @IsJWT()
  accessToken: string;

  @ApiProperty()
  @IsJWT()
  refreshToken: string;
}
