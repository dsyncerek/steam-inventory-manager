import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, InventoryState } from './inventory.reducer';

const selectors = adapter.getSelectors();

export const selectInventoryState = createFeatureSelector<InventoryState>('inventories');

export const selectInventories = createSelector(
  selectInventoryState,
  selectors.selectAll,
);

export const selectBotInventories = (steamId: string) =>
  createSelector(
    selectInventories,
    inventories => inventories.filter(inv => inv.botSteamId === steamId),
  );
