import { SetMetadata } from '@nestjs/common';

export const RolesAllowed = (...roles: string[]) => {
  return SetMetadata('roles', roles);
};
