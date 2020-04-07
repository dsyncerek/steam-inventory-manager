import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '@core/core.state';
import { deleteInventory, getInventory, openAddInventoryDialog, refreshInventory } from '@inventory/inventory.actions';
import { Inventory } from '@inventory/models/inventory';
import { Store } from '@ngrx/store';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-inventories-view',
  templateUrl: './inventories-view.component.html',
  styleUrls: ['./inventories-view.component.scss'],
})
export class InventoriesViewComponent {
  @Input() steamId: string;
  @Input() inventories: Inventory[];

  constructor(private readonly store: Store<AppState>, private readonly dialog: MatDialog) {}

  onInventoryAdd(): void {
    this.store.dispatch(openAddInventoryDialog({ steamId: this.steamId }));
  }

  onInventoryShow(id: string): void {
    this.store.dispatch(getInventory({ id }));
  }

  onInventoryRefresh(id: string): void {
    this.store.dispatch(refreshInventory({ id }));
  }

  onInventoryDelete(id: string): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '500px',
        data: { message: `Do you really want to delete inventory?` },
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.store.dispatch(deleteInventory({ id }));
      });
  }
}
