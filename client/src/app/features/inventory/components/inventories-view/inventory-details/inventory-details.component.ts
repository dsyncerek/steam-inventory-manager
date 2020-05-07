import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventory } from '@inventory/models/inventory';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryDetailsComponent {
  @Input() inventory: Inventory;
  @Output() inventoryAdd = new EventEmitter<void>();
  @Output() inventoryRefresh = new EventEmitter<string>();
  @Output() inventoryDelete = new EventEmitter<string>();
}
