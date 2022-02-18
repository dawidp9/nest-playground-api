import { ROLE } from '../../entities/role.entity';

export type Role = {
  id: number;
  role: ROLE;
};

export type UserPayload = {
  id: number;
  email: string;
  roles: Role[];
};
