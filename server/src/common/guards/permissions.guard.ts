import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/entity/user.entity';
import { PermissionsEnum } from '../enums/permissions.enum';

@Injectable()
export class PermissionsGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<PermissionsEnum[]>('permissions', context.getHandler());

    if (!permissions) {
      return true;
    }

    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return user.hasPermission(...permissions);
  }
}
