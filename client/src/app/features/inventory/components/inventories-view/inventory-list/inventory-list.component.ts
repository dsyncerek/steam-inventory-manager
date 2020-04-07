import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventory } from '@inventory/models/inventory';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryListComponent {
  @Input() inventories: Inventory[] = [];
  @Output() inventoryAdd = new EventEmitter<void>();
  @Output() inventoryShow = new EventEmitter<string>();
  @Output() inventoryRefresh = new EventEmitter<string>();
  @Output() inventoryDelete = new EventEmitter<string>();

  get mergedInventory(): Inventory {
    const count = this.inventories.reduce((a, b) => a + b.count, 0);
    const worth = this.inventories.reduce((a, b) => a + b.worth, 0);

    return { id: null, botSteamId: null, appId: null, contextId: null, items: [], worth, count };
  }
}
