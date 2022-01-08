import { IsOptional, IsNumber, IsString } from 'class-validator';

export class Restaurant {
  @IsNumber() @IsOptional() readonly id: number;
  @IsString() readonly name: string;
  @IsString() readonly description: string;
  @IsString() @IsOptional() readonly cover: string;
}
