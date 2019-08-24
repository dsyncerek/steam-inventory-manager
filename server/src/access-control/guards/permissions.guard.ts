import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { arrayIntersectionAny } from '../../common/utils/array.util';
import { User } from '../../user/entity/user.entity';
import { AccessControlService } from '../access-control.service';
import { PermissionsEnum } from '../enums/permissions.enum';
import { RolesEnum } from '../enums/roles.enum';

@Injectable()
export class PermissionsGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, private readonly acService: AccessControlService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<PermissionsEnum[]>('permissions', context.getHandler());

    if (!permissions) {
      return true;
    }

    await super.canActivate(context);

    const userRoles = this.getUserRoles(context);
    const userPermissions = this.acService.getPermissionsInRole(...userRoles);

    return arrayIntersectionAny(userPermissions, permissions);
  }

  private getUserRoles(context: ExecutionContext): RolesEnum[] {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return user.roles;
  }
}
