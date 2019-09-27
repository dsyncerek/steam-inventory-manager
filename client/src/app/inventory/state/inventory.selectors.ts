import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Inventory } from '../models/inventory';
import { InventoryState } from './inventory.reducer';

export const selectInventoryState = createFeatureSelector<InventoryState>('inventory');

export const selectInventories = createSelector(
  selectInventoryState,
  (state: InventoryState): Inventory[] => Object.values(state.entities),
);

export const selectBotInventories = (steamId: string) =>
  createSelector(
    selectInventories,
    (inventories: Inventory[]): Inventory[] => inventories.filter(inv => inv.botSteamId === steamId),
  );
