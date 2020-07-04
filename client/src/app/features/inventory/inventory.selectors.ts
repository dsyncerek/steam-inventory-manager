import { inventoryFeatureKey, InventoryState } from '@inventory/inventory.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInventory from './inventory.reducer';

export const selectInventoryState = createFeatureSelector<InventoryState>(inventoryFeatureKey);

export const selectInventoryEntities = createSelector(selectInventoryState, fromInventory.selectEntities);
