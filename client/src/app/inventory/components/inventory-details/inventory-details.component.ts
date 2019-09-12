import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventory } from '../../models/inventory';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss'],
})
export class InventoryDetailsComponent {
  @Input() inventory: Inventory;

  @Output() inventoryShow = new EventEmitter<string>();
  @Output() inventoryRefresh = new EventEmitter<string>();
  @Output() inventoryDelete = new EventEmitter<string>();
}
