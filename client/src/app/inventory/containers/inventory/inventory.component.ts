import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { Inventory } from '../../models/inventory';
import { selectBotInventories } from '../../state/inventory.selectors';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {
  @Input() steamId: string;

  inventories$: Observable<Inventory[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.inventories$ = this.store.select(selectBotInventories(this.steamId));
  }

  onInventoryAdd(): void {
    console.log(`Add`);
  }

  onInventoryShow(id: string): void {
    console.log(`Show: ${id}`);
  }

  onInventoryRefresh(id: string): void {
    console.log(`Refresh: ${id}`);
  }

  onInventoryDelete(id: string): void {
    console.log(`Delete: ${id}`);
  }
}
