import { AuthAction, AuthActionTypes } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
};

export function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login:
      return { ...state, isAuthenticated: true };

    case AuthActionTypes.Logout:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}
