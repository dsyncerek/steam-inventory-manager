import { NgModule } from '@angular/core';
import { AddInventoryDialogComponent } from '@inventory/components/add-inventory-dialog/add-inventory-dialog.component';
import { AddInventoryFormComponent } from '@inventory/components/add-inventory-dialog/add-inventory-form/add-inventory-form.component';
import { InventoriesViewComponent } from '@inventory/components/inventories-view/inventories-view.component';
import { InventoryDetailsComponent } from '@inventory/components/inventories-view/inventory-details/inventory-details.component';
import { InventoryListComponent } from '@inventory/components/inventories-view/inventory-list/inventory-list.component';
import { InventoryEffects } from '@inventory/inventory.effects';
import { ItemModule } from '@item/item.module';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, EffectsModule.forFeature([InventoryEffects]), ItemModule],
  exports: [InventoriesViewComponent],
  declarations: [
    InventoryDetailsComponent,
    InventoryListComponent,
    AddInventoryFormComponent,
    AddInventoryDialogComponent,
    InventoriesViewComponent,
  ],
})
export class InventoryModule {}
