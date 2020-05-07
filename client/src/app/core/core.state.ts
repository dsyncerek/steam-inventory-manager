import { asyncFeatureKey, asyncReducer, AsyncState } from '@core/async/async.reducer';
import { authFeatureKey, authReducer, AuthState } from '@core/auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  [authFeatureKey]: AuthState;
  [asyncFeatureKey]: AsyncState;
}

export const reducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: authReducer,
  [asyncFeatureKey]: asyncReducer,
};
