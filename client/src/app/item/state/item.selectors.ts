import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Item } from '../models/item';
import { ItemState } from './item.reducer';

export const selectItemState = createFeatureSelector<ItemState>('items');

export const selectItems = createSelector(
  selectItemState,
  (state: ItemState): Item[] => Object.values(state.entities),
);
