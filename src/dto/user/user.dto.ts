import { IsEmail, IsString, Length } from 'class-validator';

export class UserDto {
  @IsEmail() readonly email: string;
  @IsString() @Length(6, 36) readonly password: string;
}
