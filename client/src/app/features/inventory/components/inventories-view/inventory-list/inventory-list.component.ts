import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Inventory } from '@inventory/models/inventory';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../../../../core/async/async.selectors';
import { AppState } from '../../../../../core/core.state';
import { getInventory, refreshInventory } from '../../../inventory.actions';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryListComponent {
  @Input() steamId: string;
  @Input() inventories: Inventory[] = [];

  loading$ = this.store.select(selectLoading, { types: [getInventory.type, refreshInventory.type] });
  selectedIndex: number = 0;

  get mergedInventory(): Inventory {
    const count = this.inventories.reduce((a, b) => a + b.count, 0);
    const worth = this.inventories.reduce((a, b) => a + b.worth, 0);

    return { id: null, botSteamId: null, appId: null, contextId: null, items: [], worth, count };
  }

  constructor(private readonly store: Store<AppState>) {}

  onTabChange(): void {
    if (this.selectedIndex > 0) {
      const selected = this.inventories[this.selectedIndex - 1];

      if (!selected.items) {
        this.store.dispatch(getInventory({ id: selected.id }));
      }
    }
  }

  trackByFn(index: number, item: Inventory): string {
    return item.id;
  }
}
