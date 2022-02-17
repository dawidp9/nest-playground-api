import { IsEmail, IsString, Length } from 'class-validator';

export class UserCredentialsDto {
  @IsEmail() readonly email: string;
  @IsString() @Length(6, 36) readonly password: string;
}
