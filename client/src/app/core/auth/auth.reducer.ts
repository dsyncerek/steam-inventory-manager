import { AuthAction, AuthActionTypes } from '@core/auth/auth.actions';

export const authFeatureKey = 'auth';

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
