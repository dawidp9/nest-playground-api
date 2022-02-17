import { IsEmail, IsString, Length } from 'class-validator';

export class Survey {
  @IsEmail() readonly email: string;
  @IsString() @Length(3, 99) readonly username: string;
}
