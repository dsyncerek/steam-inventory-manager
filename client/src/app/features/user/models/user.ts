export enum Role {
  Admin = 'ADMIN',
  ItemManager = 'ITEM_MANAGER',
  User = 'USER',
}

export interface User {
  steamId: string;
  roles: Role[];
}
