import { DynamicModule, Module } from '@nestjs/common';
import { RolesConfig } from '../roles.config';
import { AccessControlService } from './access-control.service';
import { ROLES_CONFIG_TOKEN } from './decorators/inject-roles-config.decorator';

@Module({})
export class AccessControlModule {
  static register(rolesConfig: RolesConfig): DynamicModule {
    return {
      module: AccessControlModule,
      providers: [AccessControlService, { provide: ROLES_CONFIG_TOKEN, useValue: rolesConfig }],
      exports: [AccessControlService],
    };
  }
}
