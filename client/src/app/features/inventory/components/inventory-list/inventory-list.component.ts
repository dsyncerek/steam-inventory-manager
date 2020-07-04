import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../../../core/async/async.selectors';
import { AppState } from '../../../../core/core.state';
import { getInventory, refreshInventory } from '../../inventory.actions';
import { Inventory } from '../../models/inventory';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryListComponent implements OnChanges {
  @Input()
  public steamId: string;

  @Input()
  public inventories: Inventory[] = [];

  public loading$ = this.store.select(selectLoading, { types: [getInventory.type, refreshInventory.type] });
  public selectedIndex = 0;
  public mergedInventory: Inventory;

  constructor(private readonly store: Store<AppState>) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.inventories) {
      this.setupMergedInventory();
    }
  }

  public onTabChange(): void {
    if (this.selectedIndex > 0) {
      const selected = this.inventories[this.selectedIndex - 1];

      if (!selected.items) {
        this.store.dispatch(getInventory({ id: selected.id }));
      }
    }
  }

  public trackByFn(index: number, item: Inventory): string {
    return item.id;
  }

  public setupMergedInventory(): void {
    const count = this.inventories.reduce((a, b) => a + b.count, 0);
    const worth = this.inventories.reduce((a, b) => a + b.worth, 0);

    this.mergedInventory = { id: null, botSteamId: null, appId: null, contextId: null, items: [], worth, count };
  }
}
