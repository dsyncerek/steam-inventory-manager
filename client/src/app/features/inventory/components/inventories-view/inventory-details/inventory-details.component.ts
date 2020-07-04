import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Inventory } from '@inventory/models/inventory';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../core/core.state';
import { DialogService } from '../../../../../core/dialog.service';
import { deleteInventory, openAddInventoryDialog, refreshInventory } from '../../../inventory.actions';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryDetailsComponent {
  @Input()
  public steamId: string;

  @Input()
  public inventory: Inventory;

  @Input()
  public loading: boolean;

  constructor(private readonly store: Store<AppState>, private readonly dialogService: DialogService) {}

  public refreshInventory(): void {
    this.store.dispatch(refreshInventory({ id: this.inventory.id }));
  }

  public addInventory(): void {
    this.store.dispatch(openAddInventoryDialog({ steamId: this.steamId }));
  }

  public deleteInventory(): void {
    const message = `Do you really want to delete inventory ${this.inventory.appId}/${this.inventory.contextId}?`;

    this.dialogService.openConfirmationDialog(message).subscribe(() => {
      this.store.dispatch(deleteInventory({ id: this.inventory.id }));
    });
  }
}
