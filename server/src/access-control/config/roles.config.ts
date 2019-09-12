import { PermissionsEnum } from '../enums/permissions.enum';
import { RolesEnum } from '../enums/roles.enum';

export type RolesConfig = { [key in RolesEnum]: PermissionsEnum[] };

export const rolesConfig: RolesConfig = {
  [RolesEnum.User]: [
    PermissionsEnum.BotGetAllByUserOwn,
    PermissionsEnum.BotGetOwn,
    PermissionsEnum.BotCreateOwn,
    PermissionsEnum.BotUpdateOwn,
    PermissionsEnum.BotDeleteOwn,
    PermissionsEnum.InventoryGetAllByUserOwn,
    PermissionsEnum.InventoryGetAllByBotOwn,
    PermissionsEnum.InventoryGetOwn,
    PermissionsEnum.InventoryCreateOwn,
    PermissionsEnum.InventoryRefreshOwn,
    PermissionsEnum.InventoryDeleteOwn,
    PermissionsEnum.ItemGetAll,
    PermissionsEnum.ItemGetAny,
  ],
  [RolesEnum.ItemsManager]: [
    PermissionsEnum.ItemGetAll,
    PermissionsEnum.ItemGetAny,
    PermissionsEnum.ItemCreateAny,
    PermissionsEnum.ItemUpdateAny,
    PermissionsEnum.ItemDeleteAny,
  ],
  [RolesEnum.Admin]: [
    PermissionsEnum.UserGetAll,
    PermissionsEnum.UserGetAny,
    PermissionsEnum.UserCreateAny,
    PermissionsEnum.UserUpdateAny,
    PermissionsEnum.UserDeleteAny,
    PermissionsEnum.BotGetAll,
    PermissionsEnum.BotGetAllByUserAny,
    PermissionsEnum.BotGetAny,
    PermissionsEnum.BotCreateAny,
    PermissionsEnum.BotUpdateAny,
    PermissionsEnum.BotDeleteAny,
    PermissionsEnum.InventoryGetAllByUserAny,
    PermissionsEnum.InventoryGetAllByBotAny,
    PermissionsEnum.InventoryGetAny,
    PermissionsEnum.InventoryRefreshAny,
    PermissionsEnum.ItemGetAll,
    PermissionsEnum.ItemGetAny,
    PermissionsEnum.ItemCreateAny,
    PermissionsEnum.ItemUpdateAny,
    PermissionsEnum.ItemDeleteAny,
  ],
};
