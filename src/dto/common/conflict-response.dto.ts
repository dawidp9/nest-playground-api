import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from '../../auth/interface/auth.interface';

export class ConflictResponseDto implements HttpExceptionResponse {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Resource already exist' })
  message: string;
}
