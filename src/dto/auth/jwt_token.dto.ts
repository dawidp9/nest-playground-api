import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto implements Readonly<JwtTokenDto> {
  @ApiProperty()
  @IsString()
  access_token: string;
}
