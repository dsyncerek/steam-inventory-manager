import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AppState } from '@core/core.state';
import { selectInventoriesByIds } from '@inventory/inventory.selectors';
import { Inventory } from '@inventory/models/inventory';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventories-view',
  templateUrl: './inventories-view.component.html',
  styleUrls: ['./inventories-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoriesViewComponent implements OnInit {
  @Input() steamId: string;
  @Input() inventoryIds: string[];
  inventories$: Observable<Inventory[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.inventories$ = this.store.select(selectInventoriesByIds, { ids: this.inventoryIds });
  }
}
