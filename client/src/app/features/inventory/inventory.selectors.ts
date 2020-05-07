import { AppState } from '@core/core.state';
import * as fromInventory from '@inventory/inventory.reducer';
import { inventoryFeatureKey, InventoryState } from '@inventory/inventory.reducer';
import { inventorySchema } from '@inventory/models/inventory';
import * as fromItems from '@item/item.reducer';
import { selectItemState } from '@item/item.selectors';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { denormalize } from '@shared/utils/normalize';

export const selectInventoryState = createFeatureSelector<InventoryState>(inventoryFeatureKey);

export const selectAllInventories = createSelector(
  (state: AppState) => fromInventory.selectIds(selectInventoryState(state)),
  (state: AppState) => fromInventory.selectEntities(selectInventoryState(state)),
  (state: AppState) => fromItems.selectEntities(selectItemState(state)),
  (ids, inventories, items) => {
    return denormalize(ids, [inventorySchema], { inventories, items });
  },
);

export const selectInventoriesByIds = createSelector(selectAllInventories, (inventories, { ids }) =>
  inventories.filter(inv => ids.includes(inv.id)),
);
