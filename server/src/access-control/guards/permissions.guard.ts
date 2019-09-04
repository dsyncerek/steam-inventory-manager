import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/entity/user.entity';
import { AccessControlService } from '../access-control.service';
import { PermissionsEnum } from '../enums/permissions.enum';

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

    const user = PermissionsGuard.getUser(context);
    return this.acService.hasUserAnyPermission(user, permissions);
  }

  private static getUser(context: ExecutionContext): User {
    const request = context.switchToHttp().getRequest();
    return request.user;
  }
}
