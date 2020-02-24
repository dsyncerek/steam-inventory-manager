import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { ItemModule } from '../item/item.module';
import { InventoryDetailsComponent } from './components/inventory-details/inventory-details.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryComponent } from './containers/inventory.component';
import { InventoryEffects } from './inventory.effects';

@NgModule({
  imports: [SharedModule, EffectsModule.forFeature([InventoryEffects]), ItemModule],
  declarations: [InventoryDetailsComponent, InventoryListComponent, InventoryComponent],
  exports: [InventoryComponent],
})
export class InventoryModule {}
