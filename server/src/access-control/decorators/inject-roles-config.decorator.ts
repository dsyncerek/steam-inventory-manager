import { Inject } from '@nestjs/common';

export const ROLES_CONFIG_TOKEN = 'ROLES_CONFIG_TOKEN';

export const InjectRolesConfig = () => {
  return Inject(ROLES_CONFIG_TOKEN);
};
