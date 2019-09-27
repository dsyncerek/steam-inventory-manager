import { Action } from '@ngrx/store';
import { ErrorAction } from '../../shared/utils/error-action';
import { Item } from '../models/item';

export enum ItemActionTypes {
  GetAllItems = '[Item] Get all items',
  GetAllItemsSuccess = '[Item] Get all items - success',
  GetAllItemsError = '[Item] Get all items - error',

  GetItem = '[Item] Get item',
  GetItemSuccess = '[Item] Get item - success',
  GetItemError = '[Item] Get item - error',

  CreateItem = '[Item] Create item',
  CreateItemSuccess = '[Item] Create item - success',
  CreateItemError = '[Item] Create item - error',

  UpdateItem = '[Item] Update item',
  UpdateItemSuccess = '[Item] Update item - success',
  UpdateItemError = '[Item] Update item - error',

  DeleteItem = '[Item] Delete item',
  DeleteItemSuccess = '[Item] Delete item - success',
  DeleteItemError = '[Item] Delete item - error',
}

export class GetAllItems implements Action {
  readonly type = ItemActionTypes.GetAllItems;
}

export class GetAllItemsSuccess implements Action {
  readonly type = ItemActionTypes.GetAllItemsSuccess;

  constructor(public payload: { items: Item[] }) {}
}

export class GetAllItemsError extends ErrorAction {
  readonly type = ItemActionTypes.GetAllItemsError;
}

export class GetItem implements Action {
  readonly type = ItemActionTypes.GetItem;

  constructor(public payload: { classId: string }) {}
}

export class GetItemSuccess implements Action {
  readonly type = ItemActionTypes.GetItemSuccess;

  constructor(public payload: { item: Item }) {}
}

export class GetItemError extends ErrorAction {
  readonly type = ItemActionTypes.GetItemError;
}

export class CreateItem implements Action {
  readonly type = ItemActionTypes.CreateItem;

  constructor(public payload: { item: Item }) {}
}

export class CreateItemSuccess implements Action {
  readonly type = ItemActionTypes.CreateItemSuccess;

  constructor(public payload: { item: Item }) {}
}

export class CreateItemError extends ErrorAction {
  readonly type = ItemActionTypes.CreateItemError;
}

export class UpdateItem implements Action {
  readonly type = ItemActionTypes.UpdateItem;

  constructor(public payload: { item: Item }) {}
}

export class UpdateItemSuccess implements Action {
  readonly type = ItemActionTypes.UpdateItemSuccess;

  constructor(public payload: { item: Item }) {}
}

export class UpdateItemError extends ErrorAction {
  readonly type = ItemActionTypes.UpdateItemError;
}

export class DeleteItem implements Action {
  readonly type = ItemActionTypes.DeleteItem;

  constructor(public payload: { classId: string }) {}
}

export class DeleteItemSuccess implements Action {
  readonly type = ItemActionTypes.DeleteItemSuccess;

  constructor(public payload: { classId: string }) {}
}

export class DeleteItemError extends ErrorAction {
  readonly type = ItemActionTypes.DeleteItemError;
}

export type ItemActions =
  | GetAllItems
  | GetAllItemsSuccess
  | GetAllItemsError
  | GetItem
  | GetItemSuccess
  | GetItemError
  | CreateItem
  | CreateItemSuccess
  | CreateItemError
  | UpdateItem
  | UpdateItemSuccess
  | UpdateItemError
  | DeleteItem
  | DeleteItemSuccess
  | DeleteItemError;
