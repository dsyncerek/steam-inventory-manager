import { NgModule } from '@angular/core';
import { AddInventoryDialogComponent } from '@inventory/components/add-inventory-dialog/add-inventory-dialog.component';
import { AddInventoryFormComponent } from '@inventory/components/add-inventory-dialog/add-inventory-form/add-inventory-form.component';
import { InventoryDetailsComponent } from '@inventory/components/inventory-list/inventory-details/inventory-details.component';
import { InventoryListComponent } from '@inventory/components/inventory-list/inventory-list.component';
import { InventoryEffects } from '@inventory/inventory.effects';
import { inventoryFeatureKey, inventoryReducer } from '@inventory/inventory.reducer';
import { ItemModule } from '@item/item.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(inventoryFeatureKey, inventoryReducer),
    EffectsModule.forFeature([InventoryEffects]),
    ItemModule,
  ],
  declarations: [
    InventoryDetailsComponent,
    InventoryListComponent,
    AddInventoryFormComponent,
    AddInventoryDialogComponent,
  ],
  exports: [InventoryListComponent],
})
export class InventoryModule {}
