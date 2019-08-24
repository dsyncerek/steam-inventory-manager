import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { rolesConfig } from './config/roles.config';
import { ROLES_CONFIG_TOKEN } from './decorators/inject-roles-config.decorator';

@Module({
  providers: [AccessControlService, { provide: ROLES_CONFIG_TOKEN, useValue: rolesConfig }],
  exports: [AccessControlService],
})
export class AccessControlModule {}
