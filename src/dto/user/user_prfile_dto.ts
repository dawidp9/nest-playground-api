import { IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '../../entities/role.entity';

export class UserProfileDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ enum: ROLE, isArray: true })
  readonly roles: ROLE[];
}
