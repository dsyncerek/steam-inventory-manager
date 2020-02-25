import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = 'AUTH_LOGIN',
  Logout = 'AUTH_LOGOUT',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthAction = Login | Logout;
