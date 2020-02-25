import { Action } from '@ngrx/store';

export interface AnyAction extends Action {
  [key: string]: any;
}
