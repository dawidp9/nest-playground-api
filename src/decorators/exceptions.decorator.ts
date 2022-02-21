import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedResponseDto } from '../dto/common/unauthorized_response.dto';
import { ForbiddenResponseDto } from '../dto/common/forbidden_response.dto';
import { ConflictResponseDto } from '../dto/common/conflict_response.dto';
import { BadRequestResponseDto } from '../dto/common/bad_request_response.dto';
import { NotFoundResponseDto } from '../dto/common/not_found_response.dto';

export const ApiUnauthorizedExceptionResponse = () =>
  ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  });

export const ApiForbiddenExceptionResponse = () =>
  ApiForbiddenResponse({
    description: 'Forbidden',
    type: ForbiddenResponseDto,
  });

export const ApiConflictExceptionResponse = () =>
  ApiConflictResponse({
    description: 'Conflict',
    type: ConflictResponseDto,
  });

export const ApiBadRequestExceptionResponse = () =>
  ApiBadRequestResponse({
    description: 'Bad Request',
    type: BadRequestResponseDto,
  });

export const ApiNotFoundExceptionResponse = () =>
  ApiNotFoundResponse({
    description: 'Not Found',
    type: NotFoundResponseDto,
  });
