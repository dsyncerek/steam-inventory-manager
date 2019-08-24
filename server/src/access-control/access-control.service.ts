import { Injectable } from '@nestjs/common';
import { RolesConfig } from './config/roles.config';
import { InjectRolesConfig } from './decorators/inject-roles-config.decorator';
import { PermissionsEnum } from './enums/permissions.enum';
import { RolesEnum } from './enums/roles.enum';

@Injectable()
export class AccessControlService {
  constructor(@InjectRolesConfig() private readonly rolesConfig: RolesConfig) {}

  getPermissionsInRole(...roles: RolesEnum[]): PermissionsEnum[] {
    const permissions: Set<PermissionsEnum> = new Set();

    roles.forEach(role => {
      const permissionsInRole = this.rolesConfig[role] || [];
      permissionsInRole.forEach(permission => permissions.add(permission));
    });

    return Array.from(permissions);
  }
}
