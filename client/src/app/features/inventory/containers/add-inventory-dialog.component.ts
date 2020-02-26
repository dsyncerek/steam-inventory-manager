import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { selectLoading } from '../../../core/async/async.selectors';
import { AppState } from '../../../core/core.state';
import { CreateInventory, InventoryActionTypes } from '../inventory.actions';
import { Inventory } from '../models/inventory';

@Component({
  selector: 'app-add-inventory-dialog',
  template: `
    <app-add-inventory-form [adding]="adding$ | async" (addInventory)="onAddInventory($event)"></app-add-inventory-form>
  `,
})
export class AddInventoryDialogComponent {
  adding$ = this.store.select(selectLoading, { types: [InventoryActionTypes.CreateInventory] });

  constructor(
    private readonly store: Store<AppState>,
    private readonly dialogRef: MatDialogRef<AddInventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { steamId: string },
  ) {}

  onAddInventory({ appId, contextId }: Inventory): void {
    this.store.dispatch(new CreateInventory({ steamId: this.data.steamId, appId, contextId }));

    this.adding$
      .pipe(
        filter(adding => !adding),
        first(),
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
