export enum PermissionsEnum {
  GetAllUsers = 'GET_ALL_USERS',
  GetUser = 'GET_USER',
  CreateUser = 'CREATE_USER',
  UpdateUser = 'UPDATE_USER',
  DeleteUser = 'DELETE_USER',

  GetAllBots = 'GET_ALL_BOTS',
  GetAllUserBots = 'GET_ALL_USER_BOTS',
  GetBot = 'GET_BOT',
  CreateBot = 'CREATE_BOT',
  UpdateBot = 'UPDATE_BOT',
  DeleteBot = 'DELETE_BOT',

  GetAllBotInventories = 'GET_ALL_BOT_INVENTORIES',
  GetBotInventory = 'GET_BOT_INVENTORY',
  RefreshBotInventory = 'REFRESH_BOT_INVENTORY',

  GetAllItems = 'GET_ALL_ITEMS',
  GetItem = 'GET_ITEM',
  CreateItem = 'CREATE_ITEM',
  UpdateItem = 'UPDATE_ITEM',
  DeleteItem = 'DELETE_ITEM',
}
