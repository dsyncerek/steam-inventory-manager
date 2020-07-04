import { itemFeatureKey, ItemState } from '@item/item.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItem from './item.reducer';

export const selectItemState = createFeatureSelector<ItemState>(itemFeatureKey);

export const selectItemEntities = createSelector(selectItemState, fromItem.selectEntities);
