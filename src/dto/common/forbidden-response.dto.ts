import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from '../../auth/interface/auth.interface';

export class ForbiddenResponseDto implements HttpExceptionResponse {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Forbidden resource' })
  message: string;

  @ApiProperty({ example: 'Forbidden' })
  error: string;
}
