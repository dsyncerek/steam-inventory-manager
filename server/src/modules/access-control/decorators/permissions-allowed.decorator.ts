import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from '../enums/permissions.enum';

export const PermissionsAllowed = (...permissions: PermissionsEnum[]): any => {
  return SetMetadata('permissions', permissions);
};
