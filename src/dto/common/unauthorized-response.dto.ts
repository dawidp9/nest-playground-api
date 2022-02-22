import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionResponse } from '../../auth/interface/auth.interface';

export class UnauthorizedResponseDto implements HttpExceptionResponse {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}
