import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Inventory } from '../models/inventory';
import { adapter, InventoryState } from './inventory.reducer';

const selectors = adapter.getSelectors();

export const selectInventoryState = createFeatureSelector<InventoryState>('inventory');

export const selectInventoryEntities = createSelector(
  selectInventoryState,
  selectors.selectEntities,
);

export const selectInventoryIds = createSelector(
  selectInventoryState,
  selectors.selectIds,
);

export const selectInventories = createSelector(
  selectInventoryState,
  selectors.selectAll,
);

export const selectInventory = createSelector(
  selectInventoryEntities,
  (entities: Dictionary<Inventory>, { classId }): Inventory => entities[classId],
);

export const selectBotInventories = createSelector(
  selectInventories,
  (inventories: Inventory[], { steamId }) => inventories.filter(inventory => inventory.botSteamId === steamId),
);
