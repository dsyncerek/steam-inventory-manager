import { PermissionsEnum } from '../enums/permissions.enum';
import { RolesEnum } from '../enums/roles.enum';

export const rolesConfig = {
  [RolesEnum.User]: [PermissionsEnum.GetAllItems, PermissionsEnum.GetItem],
  [RolesEnum.Admin]: [
    PermissionsEnum.GetAllUsers,
    PermissionsEnum.GetUser,
    PermissionsEnum.CreateUser,
    PermissionsEnum.UpdateUser,
    PermissionsEnum.DeleteUser,
    PermissionsEnum.GetAllItems,
    PermissionsEnum.GetItem,
    PermissionsEnum.CreateItem,
    PermissionsEnum.UpdateItem,
    PermissionsEnum.DeleteItem,
    PermissionsEnum.GetAllBots,
    PermissionsEnum.GetAllUserBots,
    PermissionsEnum.GetBot,
    PermissionsEnum.CreateBot,
    PermissionsEnum.UpdateBot,
    PermissionsEnum.DeleteBot,
    PermissionsEnum.GetAllBotInventories,
    PermissionsEnum.GetBotInventory,
    PermissionsEnum.RefreshBotInventory,
  ],
};
