import { Action } from '@ngrx/store';
import { Entities } from '../../core/entities/models/entities';
import { ErrorAction } from '../../shared/utils/error-action';

export enum InventoryActionTypes {
  GetUserInventories = '[Inventory] Get user inventories',
  GetUserInventoriesSuccess = '[Inventory] Get user inventories - success',
  GetUserInventoriesError = '[Inventory] Get user inventories - error',

  GetBotInventories = '[Inventory] Get bot inventories',
  GetBotInventoriesSuccess = '[Inventory] Get bot inventories - success',
  GetBotInventoriesError = '[Inventory] Get bot inventories - error',

  GetInventory = '[Inventory] Get inventory',
  GetInventorySuccess = '[Inventory] Get inventory - success',
  GetInventoryError = '[Inventory] Get inventory - error',

  CreateInventory = '[Inventory] Create inventory',
  CreateInventorySuccess = '[Inventory] Create inventory - success',
  CreateInventoryError = '[Inventory] Create inventory - error',

  RefreshInventory = '[Inventory] Refresh inventory',
  RefreshInventorySuccess = '[Inventory] Refresh inventory - success',
  RefreshInventoryError = '[Inventory] Refresh inventory - error',

  DeleteInventory = '[Inventory] Delete inventory',
  DeleteInventorySuccess = '[Inventory] Delete inventory - success',
  DeleteInventoryError = '[Inventory] Delete inventory - error',
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
