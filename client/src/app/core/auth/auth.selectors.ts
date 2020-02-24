import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../core.state';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');

export const selectIsAuthenticated = createSelector(selectAuthState, state => state.isAuthenticated);
