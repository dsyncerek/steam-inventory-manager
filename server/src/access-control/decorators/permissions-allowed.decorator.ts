import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from '../enums/permissions.enum';

export const PermissionsAllowed = (...permissions: PermissionsEnum[]) => {
  return SetMetadata('permissions', permissions);
};
