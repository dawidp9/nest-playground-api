import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from '../../auth/interface/auth.interface';

export class BadRequestResponseDto implements HttpExceptionResponse {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'invalid example filed', isArray: true })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
