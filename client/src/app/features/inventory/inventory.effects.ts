import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalize } from 'normalizr';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AddInventoryDialogComponent } from './containers/add-inventory-dialog.component';
import * as inventoryActions from './inventory.actions';
import { InventoryActionTypes } from './inventory.actions';
import { InventoryService } from './inventory.service';
import { inventorySchema } from './models/inventory';

@Injectable()
export class InventoryEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly inventoryService: InventoryService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {}

  @Effect({ dispatch: false })
  openAddInventoryDialog = this.actions$.pipe(
    ofType<inventoryActions.OpenAddInventoryDialog>(InventoryActionTypes.OpenAddInventoryDialog),
    tap(({ payload }) => this.dialog.open(AddInventoryDialogComponent, { data: { steamId: payload.steamId } })),
  );

  @Effect()
  getUserInventories$ = this.actions$.pipe(
    ofType<inventoryActions.GetUserInventories>(InventoryActionTypes.GetUserInventories),
    mergeMap(({ payload }) => {
      return this.inventoryService.getUserInventories(payload.steamId).pipe(
        map(
          inventories =>
            new inventoryActions.GetUserInventoriesSuccess({
              entities: normalize(inventories, [inventorySchema]).entities,
            }),
        ),
        catchError(error => of(new inventoryActions.GetUserInventoriesError(error))),
      );
    }),
  );

  @Effect()
  getBotInventories$ = this.actions$.pipe(
    ofType<inventoryActions.GetBotInventories>(InventoryActionTypes.GetBotInventories),
    mergeMap(({ payload }) => {
      return this.inventoryService.getBotInventories(payload.steamId).pipe(
        map(
          inventories =>
            new inventoryActions.GetBotInventoriesSuccess({
              entities: normalize(inventories, [inventorySchema]).entities,
            }),
        ),
        catchError(error => of(new inventoryActions.GetBotInventoriesError(error))),
      );
    }),
  );

  @Effect()
  getInventory$ = this.actions$.pipe(
    ofType<inventoryActions.GetInventory>(InventoryActionTypes.GetInventory),
    mergeMap(({ payload }) => {
      return this.inventoryService.getInventory(payload.id).pipe(
        map(
          inventory =>
            new inventoryActions.GetInventorySuccess({ entities: normalize(inventory, inventorySchema).entities }),
        ),
        catchError(error => of(new inventoryActions.GetInventoryError(error))),
      );
    }),
  );

  @Effect()
  createInventory$ = this.actions$.pipe(
    ofType<inventoryActions.CreateInventory>(InventoryActionTypes.CreateInventory),
    mergeMap(({ payload }) => {
      return this.inventoryService.createInventory(payload.steamId, payload.appId, payload.contextId).pipe(
        map(
          inventory =>
            new inventoryActions.CreateInventorySuccess({ entities: normalize(inventory, inventorySchema).entities }),
        ),
        tap(() => this.snackBar.open('Inventory has been created!')),
        catchError(error => of(new inventoryActions.CreateInventoryError(error))),
      );
    }),
  );

  @Effect()
  refreshInventory$ = this.actions$.pipe(
    ofType<inventoryActions.RefreshInventory>(InventoryActionTypes.RefreshInventory),
    mergeMap(({ payload }) => {
      return this.inventoryService.refreshInventory(payload.id).pipe(
        map(
          inventory =>
            new inventoryActions.RefreshInventorySuccess({ entities: normalize(inventory, inventorySchema).entities }),
        ),
        tap(() => this.snackBar.open('Inventory has been refreshed!')),
        catchError(error => of(new inventoryActions.RefreshInventoryError(error))),
      );
    }),
  );

  @Effect()
  deleteInventory$ = this.actions$.pipe(
    ofType<inventoryActions.DeleteInventory>(InventoryActionTypes.DeleteInventory),
    mergeMap(({ payload }) => {
      return this.inventoryService.deleteInventory(payload.id).pipe(
        map(() => new inventoryActions.DeleteInventorySuccess({ id: payload.id })),
        tap(() => this.snackBar.open('Inventory has been deleted!')),
        catchError(error => of(new inventoryActions.DeleteInventoryError(error))),
      );
    }),
  );
}
