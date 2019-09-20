import { RolesEnum } from '../../access-control/enums/roles.enum';

export interface JwtPayload {
  iat?: Date;
  exp?: Date;
  steamId: string;
  roles: RolesEnum[];
}
