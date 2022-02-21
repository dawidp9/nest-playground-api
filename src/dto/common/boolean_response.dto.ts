import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BooleanResponseDto implements Readonly<BooleanResponseDto> {
  @ApiProperty()
  @IsBoolean()
  success: boolean;
}
