import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddInventoryDialogComponent } from '@inventory/components/add-inventory-dialog/add-inventory-dialog.component';
import * as inventoryActions from '@inventory/inventory.actions';
import { InventoryService } from '@inventory/inventory.service';
import { inventorySchema } from '@inventory/models/inventory';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { normalize } from '@shared/utils/normalize';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class InventoryEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly inventoryService: InventoryService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {}

  openAddInventoryDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(inventoryActions.openAddInventoryDialog),
        tap(({ steamId }) => this.dialog.open(AddInventoryDialogComponent, { data: { steamId } })),
      ),
    { dispatch: false },
  );

  getUserInventories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.getUserInventories),
      mergeMap(({ steamId }) =>
        this.inventoryService.getUserInventories(steamId).pipe(
          map(inventories =>
            inventoryActions.getUserInventoriesSuccess({ entities: normalize(inventories, [inventorySchema]) }),
          ),
          catchError(error => of(inventoryActions.getUserInventoriesError(error))),
        ),
      ),
    ),
  );

  getBotInventories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.getBotInventories),
      mergeMap(({ steamId }) =>
        this.inventoryService.getBotInventories(steamId).pipe(
          map(inventories =>
            inventoryActions.getBotInventoriesSuccess({ entities: normalize(inventories, [inventorySchema]) }),
          ),
          catchError(error => of(inventoryActions.getBotInventoriesError(error))),
        ),
      ),
    ),
  );

  getInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.getInventory),
      mergeMap(({ id }) =>
        this.inventoryService.getInventory(id).pipe(
          map(inventory => inventoryActions.getInventorySuccess({ entities: normalize(inventory, inventorySchema) })),
          catchError(error => of(inventoryActions.getInventoryError(error))),
        ),
      ),
    ),
  );

  createInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.createInventory),
      mergeMap(({ steamId, appId, contextId }) =>
        this.inventoryService.createInventory(steamId, appId, contextId).pipe(
          map(inventory =>
            inventoryActions.createInventorySuccess({ entities: normalize(inventory, inventorySchema) }),
          ),
          tap(() => this.snackBar.open('Inventory has been created!')),
          catchError(error => of(inventoryActions.createInventoryError(error))),
        ),
      ),
    ),
  );

  refreshInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.refreshInventory),
      mergeMap(({ id }) =>
        this.inventoryService.refreshInventory(id).pipe(
          map(inventory =>
            inventoryActions.refreshInventorySuccess({ entities: normalize(inventory, inventorySchema) }),
          ),
          tap(() => this.snackBar.open('Inventory has been refreshed!')),
          catchError(error => of(inventoryActions.refreshInventoryError(error))),
        ),
      ),
    ),
  );

  deleteInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventoryActions.deleteInventory),
      mergeMap(({ id }) =>
        this.inventoryService.deleteInventory(id).pipe(
          map(() => inventoryActions.deleteInventorySuccess({ id })),
          tap(() => this.snackBar.open('Inventory has been deleted!')),
          catchError(error => of(inventoryActions.deleteInventoryError(error))),
        ),
      ),
    ),
  );
}
