import { ROLE } from '../../entities/role.entity';

export interface UserPayload {
  id: number;
  email: string;
  roles: ROLE[];
}

export interface RequestWithUser extends Request {
  user: UserPayload;
}

export interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[];
  error?: string | Object;
}
