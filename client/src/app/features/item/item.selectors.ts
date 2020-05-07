import { itemFeatureKey, ItemState } from '@item/item.reducer';
import { createFeatureSelector } from '@ngrx/store';

export const selectItemState = createFeatureSelector<ItemState>(itemFeatureKey);
