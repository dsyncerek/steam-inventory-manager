import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ItemModule } from '../item/item.module';
import { SharedModule } from '../shared/shared.module';
import { InventoryDetailsComponent } from './components/inventory-details/inventory-details.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryComponent } from './containers/inventory/inventory.component';
import { InventoryEffects } from './state/inventory.effects';
import { inventoryReducer } from './state/inventory.reducer';

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.forFeature([InventoryEffects]),
    StoreModule.forFeature('inventories', inventoryReducer),
    ItemModule,
  ],
  declarations: [InventoryDetailsComponent, InventoryListComponent, InventoryComponent],
  exports: [InventoryComponent],
})
export class InventoryModule {}
