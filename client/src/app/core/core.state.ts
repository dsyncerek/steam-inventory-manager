import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { entitiesReducer, EntitiesState } from './entities/entities.reducer';

export interface AppState {
  auth: AuthState;
  entities: EntitiesState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  entities: entitiesReducer,
};
