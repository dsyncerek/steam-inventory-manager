import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ItemService } from '../item.service';
import * as itemActions from './item.actions';
import { ItemActionTypes } from './item.actions';

@Injectable()
export class ItemEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly itemService: ItemService,
    private readonly snackBar: MatSnackBar,
  ) {}

  @Effect()
  getAllItems$ = this.actions$.pipe(
    ofType<itemActions.GetAllItems>(ItemActionTypes.GetAllItems),
    mergeMap(() => {
      return this.itemService.getAllItems().pipe(
        map(items => new itemActions.GetAllItemsSuccess({ items })),
        catchError(error => of(new itemActions.GetAllItemsError(error))),
      );
    }),
  );

  @Effect()
  getItem$ = this.actions$.pipe(
    ofType<itemActions.GetItem>(ItemActionTypes.GetItem),
    mergeMap(({ payload }) => {
      return this.itemService.getItem(payload.classId).pipe(
        map(item => new itemActions.GetItemSuccess({ item })),
        catchError(error => of(new itemActions.GetItemError(error))),
      );
    }),
  );

  @Effect()
  createItem$ = this.actions$.pipe(
    ofType<itemActions.CreateItem>(ItemActionTypes.CreateItem),
    mergeMap(({ payload }) => {
      return this.itemService.createItem(payload.item).pipe(
        map(item => new itemActions.CreateItemSuccess({ item })),
        tap(() => this.snackBar.open('Item has been created!')),
        catchError(error => of(new itemActions.CreateItemError(error))),
      );
    }),
  );

  @Effect()
  updateItem$ = this.actions$.pipe(
    ofType<itemActions.UpdateItem>(ItemActionTypes.UpdateItem),
    mergeMap(({ payload }) => {
      return this.itemService.updateItem(payload.item).pipe(
        map(item => new itemActions.UpdateItemSuccess({ item })),
        tap(() => this.snackBar.open('Item has been updated!')),
        catchError(error => of(new itemActions.UpdateItemError(error))),
      );
    }),
  );

  @Effect()
  deleteItem$ = this.actions$.pipe(
    ofType<itemActions.DeleteItem>(ItemActionTypes.DeleteItem),
    mergeMap(({ payload }) => {
      return this.itemService.deleteItem(payload.classId).pipe(
        map(() => new itemActions.DeleteItemSuccess({ classId: payload.classId })),
        tap(() => this.snackBar.open('Item has been deleted!')),
        catchError(error => of(new itemActions.DeleteItemError(error))),
      );
    }),
  );
}
