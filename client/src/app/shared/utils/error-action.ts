import { Action } from '@ngrx/store';

export abstract class ErrorAction implements Action {
  abstract type: string;

  constructor(public payload: { error: any }) {}
}
