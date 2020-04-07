import { NgModule } from '@angular/core';
import { ItemDetailsComponent } from '@item/components/item-details/item-details.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [ItemDetailsComponent],
  exports: [ItemDetailsComponent],
})
export class ItemModule {}
