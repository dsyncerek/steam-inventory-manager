import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../../../app.state';
import { Inventory } from '../../models/inventory';
import { CreateInventory, DeleteInventory, GetInventory, RefreshInventory } from '../../state/inventory.actions';
import { selectBotInventories } from '../../state/inventory.selectors';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  @Input() steamId: string;

  inventories$: Observable<Inventory[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.inventories$ = this.store.select(selectBotInventories, { steamId: this.steamId }).pipe(tap(console.log));
  }

  onInventoryAdd(): void {
    this.store.dispatch(new CreateInventory({ steamId: this.steamId, appId: 730, contextId: 2 }));
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
