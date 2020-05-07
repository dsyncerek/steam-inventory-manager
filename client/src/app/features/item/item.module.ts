import { NgModule } from '@angular/core';
import { ItemDetailsComponent } from '@item/components/item-details/item-details.component';
import { itemFeatureKey, itemReducer } from '@item/item.reducer';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule, StoreModule.forFeature(itemFeatureKey, itemReducer)],
  declarations: [ItemDetailsComponent],
  exports: [ItemDetailsComponent],
})
export class ItemModule {}
