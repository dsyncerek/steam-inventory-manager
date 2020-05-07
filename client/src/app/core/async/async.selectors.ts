import { asyncFeatureKey, AsyncState } from '@core/async/async.reducer';
import { AppState } from '@core/core.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAsyncState = createFeatureSelector<AppState, AsyncState>(asyncFeatureKey);

export const selectLoading = createSelector(
  (state, { types }) => types.map(type => state.async[type]).filter(Boolean),
  actions => actions.some(action => action.loading),
);

export const selectError = createSelector(
  (state, { types }) => types.map(type => state.async[type]).filter(Boolean),
  actions => actions.map(action => action.error).find(Boolean),
);
