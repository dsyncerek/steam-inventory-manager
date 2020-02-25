import { ActionReducerMap } from '@ngrx/store';
import { asyncReducer, AsyncState } from './async/async.reducer';
import { authReducer, AuthState } from './auth/auth.reducer';
import { entitiesReducer, EntitiesState } from './entities/entities.reducer';

export interface AppState {
  auth: AuthState;
  async: AsyncState;
  entities: EntitiesState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  async: asyncReducer,
  entities: entitiesReducer,
};
