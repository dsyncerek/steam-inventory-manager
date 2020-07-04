import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { selectLoading } from '@core/async/async.selectors';
import { AppState } from '@core/core.state';
import { createInventory } from '@inventory/inventory.actions';
import { Inventory } from '@inventory/models/inventory';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { requestFulfilled } from '../../../../core/async/utils/request-fulfilled';

@Component({
  selector: 'app-add-inventory-dialog',
  templateUrl: './add-inventory-dialog.component.html',
  styleUrls: ['./add-inventory-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddInventoryDialogComponent {
  public adding$ = this.store.select(selectLoading, { types: [createInventory.type] });

  constructor(
    private readonly store: Store<AppState>,
    private readonly dialogRef: MatDialogRef<AddInventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { steamId: string },
  ) {}

  public onAddInventory({ appId, contextId }: Inventory): void {
    this.store.dispatch(createInventory({ steamId: this.data.steamId, appId, contextId }));

    requestFulfilled(this.adding$, of(null)).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
