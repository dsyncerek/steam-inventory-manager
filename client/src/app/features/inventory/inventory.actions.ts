import { Action } from '@ngrx/store';
import { Entities } from '../../core/entities/models/entities';
import { ErrorAction } from '../../shared/utils/error-action';

export enum InventoryActionTypes {
  OpenAddInventoryDialog = 'INVENTORY_OPEN_ADD_INVENTORY_DIALOG',

  GetUserInventories = 'INVENTORY_GET_USER_INVENTORIES',
  GetUserInventoriesSuccess = 'INVENTORY_GET_USER_INVENTORIES_SUCCESS',
  GetUserInventoriesError = 'INVENTORY_GET_USER_INVENTORIES_ERROR',

  GetBotInventories = 'INVENTORY_GET_BOT_INVENTORIES',
  GetBotInventoriesSuccess = 'INVENTORY_GET_BOT_INVENTORIES_SUCCESS',
  GetBotInventoriesError = 'INVENTORY_GET_BOT_INVENTORIES_ERROR',

  GetInventory = 'INVENTORY_GET_INVENTORY',
  GetInventorySuccess = 'INVENTORY_GET_INVENTORY_SUCCESS',
  GetInventoryError = 'INVENTORY_GET_INVENTORY_ERROR',

  CreateInventory = 'INVENTORY_CREATE_INVENTORY',
  CreateInventorySuccess = 'INVENTORY_CREATE_INVENTORY_SUCCESS',
  CreateInventoryError = 'INVENTORY_CREATE_INVENTORY_ERROR',

  RefreshInventory = 'INVENTORY_REFRESH_INVENTORY',
  RefreshInventorySuccess = 'INVENTORY_REFRESH_INVENTORY_SUCCESS',
  RefreshInventoryError = 'INVENTORY_REFRESH_INVENTORY_ERROR',

  DeleteInventory = 'INVENTORY_DELETE_INVENTORY',
  DeleteInventorySuccess = 'INVENTORY_DELETE_INVENTORY_SUCCESS',
  DeleteInventoryError = 'INVENTORY_DELETE_INVENTORY_ERROR',
}

export class OpenAddInventoryDialog implements Action {
  readonly type = InventoryActionTypes.OpenAddInventoryDialog;

  constructor(public payload: { steamId: string }) {}
}

export class GetUserInventories implements Action {
  readonly type = InventoryActionTypes.GetUserInventories;

  constructor(public payload: { steamId: string }) {}
}

export class GetUserInventoriesSuccess implements Action {
  readonly type = InventoryActionTypes.GetUserInventoriesSuccess;

  constructor(public payload: { entities: Entities }) {}
}

export class GetUserInventoriesError extends ErrorAction {
  readonly type = InventoryActionTypes.GetUserInventoriesError;
}

export class GetBotInventories implements Action {
  readonly type = InventoryActionTypes.GetBotInventories;

  constructor(public payload: { steamId: string }) {}
}

export class GetBotInventoriesSuccess implements Action {
  readonly type = InventoryActionTypes.GetBotInventoriesSuccess;

  constructor(public payload: { entities: Entities }) {}
}

export class GetBotInventoriesError extends ErrorAction {
  readonly type = InventoryActionTypes.GetBotInventoriesError;
}

export class GetInventory implements Action {
  readonly type = InventoryActionTypes.GetInventory;

  constructor(public payload: { id: string }) {}
}

export class GetInventorySuccess implements Action {
  readonly type = InventoryActionTypes.GetInventorySuccess;

  constructor(public payload: { entities: Entities }) {}
}

export class GetInventoryError extends ErrorAction {
  readonly type = InventoryActionTypes.GetInventoryError;
}

export class CreateInventory implements Action {
  readonly type = InventoryActionTypes.CreateInventory;

  constructor(public payload: { steamId: string; appId: number; contextId: number }) {}
}

export class CreateInventorySuccess implements Action {
  readonly type = InventoryActionTypes.CreateInventorySuccess;

  constructor(public payload: { entities: Entities }) {}
}

export class CreateInventoryError extends ErrorAction {
  readonly type = InventoryActionTypes.CreateInventoryError;
}

export class RefreshInventory implements Action {
  readonly type = InventoryActionTypes.RefreshInventory;

  constructor(public payload: { id: string }) {}
}

export class RefreshInventorySuccess implements Action {
  readonly type = InventoryActionTypes.RefreshInventorySuccess;

  constructor(public payload: { entities: Entities }) {}
}

export class RefreshInventoryError extends ErrorAction {
  readonly type = InventoryActionTypes.RefreshInventoryError;
}

export class DeleteInventory implements Action {
  readonly type = InventoryActionTypes.DeleteInventory;

  constructor(public payload: { id: string }) {}
}

export class DeleteInventorySuccess implements Action {
  readonly type = InventoryActionTypes.DeleteInventorySuccess;

  constructor(public payload: { id: string }) {}
}

export class DeleteInventoryError extends ErrorAction {
  readonly type = InventoryActionTypes.DeleteInventoryError;
}

export type InventoryAction =
  | GetUserInventories
  | GetUserInventoriesSuccess
  | GetUserInventoriesError
  | GetBotInventories
  | GetBotInventoriesSuccess
  | GetBotInventoriesError
  | GetInventory
  | GetInventorySuccess
  | GetInventoryError
  | CreateInventory
  | CreateInventorySuccess
  | CreateInventoryError
  | RefreshInventory
  | RefreshInventorySuccess
  | RefreshInventoryError
  | DeleteInventory
  | DeleteInventorySuccess
  | DeleteInventoryError;
