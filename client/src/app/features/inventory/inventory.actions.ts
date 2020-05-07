import { HttpErrorResponse } from '@angular/common/http';
import { Entities } from '@shared/models/entities';
import { createAction, props } from '@ngrx/store';

export const openAddInventoryDialog = createAction('INVENTORY_OPEN_ADD_INVENTORY_DIALOG', props<{ steamId: string }>());

export const getUserInventories = createAction('INVENTORY_GET_USER_INVENTORIES', props<{ steamId: string }>());
export const getUserInventoriesSuccess = createAction(
  'INVENTORY_GET_USER_INVENTORIES_SUCCESS',
  props<{ entities: Entities }>(),
);
export const getUserInventoriesError = createAction(
  'INVENTORY_GET_USER_INVENTORIES_ERROR',
  props<{ error: HttpErrorResponse }>(),
);

export const getBotInventories = createAction('INVENTORY_GET_BOT_INVENTORIES', props<{ steamId: string }>());
export const getBotInventoriesSuccess = createAction(
  'INVENTORY_GET_BOT_INVENTORIES_SUCCESS',
  props<{ entities: Entities }>(),
);
export const getBotInventoriesError = createAction(
  'INVENTORY_GET_BOT_INVENTORIES_ERROR',
  props<{ error: HttpErrorResponse }>(),
);

export const getInventory = createAction('INVENTORY_GET_INVENTORY', props<{ id: string }>());
export const getInventorySuccess = createAction('INVENTORY_GET_INVENTORY_SUCCESS', props<{ entities: Entities }>());
export const getInventoryError = createAction('INVENTORY_GET_INVENTORY_ERROR', props<{ error: HttpErrorResponse }>());

export const createInventory = createAction(
  'INVENTORY_CREATE_INVENTORY',
  props<{ steamId: string; appId: number; contextId: number }>(),
);
export const createInventorySuccess = createAction(
  'INVENTORY_CREATE_INVENTORY_SUCCESS',
  props<{ entities: Entities }>(),
);
export const createInventoryError = createAction(
  'INVENTORY_CREATE_INVENTORY_ERROR',
  props<{ error: HttpErrorResponse }>(),
);

export const refreshInventory = createAction('INVENTORY_REFRESH_INVENTORY', props<{ id: string }>());
export const refreshInventorySuccess = createAction(
  'INVENTORY_REFRESH_INVENTORY_SUCCESS',
  props<{ entities: Entities }>(),
);
export const refreshInventoryError = createAction(
  'INVENTORY_REFRESH_INVENTORY_ERROR',
  props<{ error: HttpErrorResponse }>(),
);

export const deleteInventory = createAction('INVENTORY_DELETE_INVENTORY', props<{ id: string }>());
export const deleteInventorySuccess = createAction('INVENTORY_DELETE_INVENTORY_SUCCESS', props<{ id: string }>());
export const deleteInventoryError = createAction(
  'INVENTORY_DELETE_INVENTORY_ERROR',
  props<{ error: HttpErrorResponse }>(),
);
