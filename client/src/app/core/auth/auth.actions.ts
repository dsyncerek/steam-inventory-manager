import { createAction, props } from '@ngrx/store';
import { User } from '@user/models/user';

export const login = createAction('AUTH_LOGIN', props<{ user: User }>());
export const logout = createAction('AUTH_LOGOUT');
