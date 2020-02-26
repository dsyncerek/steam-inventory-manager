import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { DeleteInventory, GetInventory, OpenAddInventoryDialog, RefreshInventory } from '../inventory.actions';
import { Inventory } from '../models/inventory';

@Component({
  selector: 'app-inventory',
  template: `
    <app-inventory-list
      [inventories]="inventories"
      (inventoryRefresh)="onInventoryRefresh($event)"
      (inventoryDelete)="onInventoryDelete($event)"
      (inventoryShow)="onInventoryShow($event)"
      (inventoryAdd)="onInventoryAdd()"
    ></app-inventory-list>
  `,
})
export class InventoryComponent {
  @Input() steamId: string;
  @Input() inventories: Inventory[];

  constructor(private readonly store: Store<AppState>) {}

  onInventoryAdd(): void {
    this.store.dispatch(new OpenAddInventoryDialog({ steamId: this.steamId }));
  }

  onInventoryShow(id: string): void {
    this.store.dispatch(new GetInventory({ id }));
  }

  onInventoryRefresh(id: string): void {
    this.store.dispatch(new RefreshInventory({ id }));
  }

  onInventoryDelete(id: string): void {
    this.store.dispatch(new DeleteInventory({ id }));
  }
}
