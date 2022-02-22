import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { forEach } from 'lodash';
import { RequestWithUser } from '../interface/auth.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ROLE } from '../../entities/role.entity';
import { isEmpty } from 'lodash';

const AuthRoleGuard = (...roles: ROLE[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    matchRoles(userRoles: ROLE[], requiredRoles: ROLE[]) {
      if (isEmpty(requiredRoles)) return true;

      let hasMatch = false;
      forEach(userRoles, (userRole) => {
        const match = requiredRoles.find((role) => role === userRole);
        if (match) hasMatch = true;
      });
      return hasMatch;
    }

    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest<RequestWithUser>();

      return this.matchRoles(request.user.roles, roles);
    }
  }

  return mixin(RoleGuardMixin);
};

export default AuthRoleGuard;
