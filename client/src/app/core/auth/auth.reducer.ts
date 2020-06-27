import { login, logout } from '@core/auth/auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@user/models/user';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const reducer = createReducer(
  initialState,
  on(login, (state, { user }) => {
    return { ...state, user, isAuthenticated: true };
  }),
  on(logout, state => {
    return { ...state, user: null, isAuthenticated: false };
  }),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
