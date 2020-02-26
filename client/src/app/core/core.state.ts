import { ActionReducerMap } from '@ngrx/store';
import { BotAction } from '../features/bot/bot.actions';
import { InventoryAction } from '../features/inventory/inventory.actions';
import { asyncReducer, AsyncState } from './async/async.reducer';
import { AuthAction } from './auth/auth.actions';
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

export type AppAction = AuthAction | BotAction | InventoryAction;
