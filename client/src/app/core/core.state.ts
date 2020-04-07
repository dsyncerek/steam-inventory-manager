import { asyncFeatureKey, asyncReducer, AsyncState } from '@core/async/async.reducer';
import { authFeatureKey, authReducer, AuthState } from '@core/auth/auth.reducer';
import { entitiesFeatureKey, entitiesReducer, EntitiesState } from '@core/entities/entities.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  [authFeatureKey]: AuthState;
  [asyncFeatureKey]: AsyncState;
  [entitiesFeatureKey]: EntitiesState;
}

export const reducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: authReducer,
  [asyncFeatureKey]: asyncReducer,
  [entitiesFeatureKey]: entitiesReducer,
};
