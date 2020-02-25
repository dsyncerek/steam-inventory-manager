import { HttpErrorResponse } from '@angular/common/http';
import { AnyAction } from '../../shared/utils/any-action';

export interface AsyncStateSlice {
  loading: boolean;
  error?: HttpErrorResponse;
}

export interface AsyncState {
  [key: string]: AsyncStateSlice;
}

export const initialState: AsyncState = {};

const asyncActionErrorSuffix = '_ERROR';
const asyncActionSuccessSuffix = '_SUCCESS';

export function asyncReducer(state: AsyncState = initialState, action: AnyAction): AsyncState {
  if (action.type.endsWith(asyncActionErrorSuffix)) {
    const key = action.type.replace(asyncActionErrorSuffix, '');
    return { ...state, [key]: { loading: false, error: action.payload.error } };
  }

  if (action.type.endsWith(asyncActionSuccessSuffix)) {
    const key = action.type.replace(asyncActionSuccessSuffix, '');
    return { ...state, [key]: { loading: false, error: null } };
  }

  return { ...state, [action.type]: { loading: true, error: null } };
}
