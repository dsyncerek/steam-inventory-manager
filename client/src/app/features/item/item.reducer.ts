import {
  createInventorySuccess,
  getBotInventoriesSuccess,
  getInventorySuccess,
  getUserInventoriesSuccess,
  refreshInventorySuccess,
} from '@inventory/inventory.actions';
import { Item, selectItemId } from '@item/models/item';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

export const itemFeatureKey = 'item';
export const itemAdapter = createEntityAdapter<Item>({ selectId: selectItemId });

export interface ItemState extends EntityState<Item> {}

const initialState: ItemState = itemAdapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(
    getInventorySuccess,
    getUserInventoriesSuccess,
    getBotInventoriesSuccess,
    createInventorySuccess,
    refreshInventorySuccess,
    (state, action) => {
      return itemAdapter.upsertMany(Object.values(action.entities.items ?? {}), state);
    },
  ),
);

export function itemReducer(state: ItemState | undefined, action: Action): ItemState {
  return reducer(state, action);
}

export const { selectAll, selectEntities, selectIds, selectTotal } = itemAdapter.getSelectors();
