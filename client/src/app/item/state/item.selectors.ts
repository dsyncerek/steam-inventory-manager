import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Item } from '../models/item';
import { adapter, ItemState } from './item.reducer';

const selectors = adapter.getSelectors();

export const selectItemState = createFeatureSelector<ItemState>('item');

export const selectItemEntities = createSelector(
  selectItemState,
  selectors.selectEntities,
);

export const selectItemIds = createSelector(
  selectItemState,
  selectors.selectIds,
);

export const selectItems = createSelector(
  selectItemState,
  selectors.selectAll,
);

export const selectItem = createSelector(
  selectItemEntities,
  (entities: Dictionary<Item>, { classId }): Item => entities[classId],
);
