import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Loadable, loadableDefault, loadableError, loadableLoad, loadableSuccess } from '../../shared/utils/loadable';
import { Inventory } from '../models/inventory';
import { InventoryActions, InventoryActionTypes } from './inventory.actions';

export const adapter: EntityAdapter<Inventory> = createEntityAdapter<Inventory>();

export interface InventoryState extends Loadable, EntityState<Inventory> {}

export const initialState: InventoryState = adapter.getInitialState({ ...loadableDefault() });

export function inventoryReducer(state = initialState, action: InventoryActions): InventoryState {
  switch (action.type) {
    case InventoryActionTypes.GetBotInventoriesSuccess:
    case InventoryActionTypes.GetUserInventoriesSuccess:
      return adapter.upsertMany(action.payload.inventories, { ...state, ...loadableSuccess() });

    case InventoryActionTypes.GetInventorySuccess:
    case InventoryActionTypes.CreateInventorySuccess:
    case InventoryActionTypes.RefreshInventorySuccess:
      return adapter.upsertOne(action.payload.inventory, { ...state, ...loadableSuccess() });

    case InventoryActionTypes.DeleteInventorySuccess:
      return adapter.removeOne(action.payload.id, { ...state, ...loadableSuccess() });

    case InventoryActionTypes.RefreshInventory:
    case InventoryActionTypes.GetUserInventories:
    case InventoryActionTypes.CreateInventory:
    case InventoryActionTypes.GetInventory:
    case InventoryActionTypes.GetBotInventories:
    case InventoryActionTypes.DeleteInventory:
      return { ...state, ...loadableLoad() };

    case InventoryActionTypes.RefreshInventoryError:
    case InventoryActionTypes.GetUserInventoriesError:
    case InventoryActionTypes.GetInventoryError:
    case InventoryActionTypes.CreateInventoryError:
    case InventoryActionTypes.GetBotInventoriesError:
    case InventoryActionTypes.DeleteInventoryError:
      return { ...state, ...loadableError(action.payload.error) };

    default:
      return state;
  }
}
