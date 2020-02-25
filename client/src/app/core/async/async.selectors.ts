import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../core.state';
import { AsyncState, AsyncStateSlice } from './async.reducer';

export const selectAsyncState = createFeatureSelector<AppState, AsyncState>('async');

export const loadingSelector = createSelector<AppState, { types: string[] }, AsyncStateSlice[], boolean>(
  (state, { types }) => types.map(type => state.async[type]).filter(Boolean),
  actions => actions.some(action => action.loading),
);

export const errorSelector = createSelector<
  AppState,
  { types: string[] },
  AsyncStateSlice[],
  HttpErrorResponse | undefined
>(
  (state, { types }) => types.map(type => state.async[type]).filter(Boolean),
  actions => actions.map(action => action.error).find(Boolean),
);
