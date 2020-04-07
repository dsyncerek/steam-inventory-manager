import { AuthState } from '@core/auth/auth.reducer';
import { AppState } from '@core/core.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');

export const selectIsAuthenticated = createSelector(selectAuthState, state => state.isAuthenticated);
