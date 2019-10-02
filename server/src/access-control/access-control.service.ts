import { Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { RolesConfig } from '../roles.config';
import { InjectRolesConfig } from './decorators/inject-roles-config.decorator';
import { PermissionsEnum } from './enums/permissions.enum';

@Injectable()
export class AccessControlService {
  constructor(@InjectRolesConfig() private readonly rolesConfig: RolesConfig) {}

  hasUserAnyPermission(user: User, permissions: PermissionsEnum[]): boolean {
    return permissions.some(permission => {
      return this.hasUserPermission(user, permission);
    });
  }

  hasUserPermission(user: User, permission: PermissionsEnum): boolean {
    return user.roles.some(role => {
      const permissionsInRole = this.rolesConfig[role] || [];
      return permissionsInRole.includes(permission);
    });
  }
}
