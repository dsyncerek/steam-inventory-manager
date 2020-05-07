import { deleteBotSuccess, getBotSuccess, getUserBotsSuccess } from '@bot/bot.actions';
import {
  createInventorySuccess,
  deleteInventorySuccess,
  getBotInventoriesSuccess,
  getInventorySuccess,
  getUserInventoriesSuccess,
  refreshInventorySuccess,
} from '@inventory/inventory.actions';
import { Inventory } from '@inventory/models/inventory';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

export const inventoryFeatureKey = 'inventory';
export const inventoryAdapter = createEntityAdapter<Inventory>();

// eslint-disable-next-line
export interface InventoryState extends EntityState<Inventory> {}

const initialState: InventoryState = inventoryAdapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(
    getUserBotsSuccess,
    getBotSuccess,
    getInventorySuccess,
    getUserInventoriesSuccess,
    getBotInventoriesSuccess,
    createInventorySuccess,
    refreshInventorySuccess,
    (state, action) => {
      return inventoryAdapter.upsertMany(Object.values(action.entities.inventories ?? {}), state);
    },
  ),
  on(deleteInventorySuccess, (state, { id }) => {
    return inventoryAdapter.removeOne(id, state);
  }),
  on(deleteBotSuccess, (state, { steamId }) => {
    // todo
    // const bot: Bot = selectBot(state, { steamId });
    // return bot ? inventoryAdapter.removeMany(bot.inventories, state) : state;
    return state;
  }),
);

export function inventoryReducer(state: InventoryState | undefined, action: Action): InventoryState {
  return reducer(state, action);
}

export const { selectAll, selectEntities, selectIds, selectTotal } = inventoryAdapter.getSelectors();
