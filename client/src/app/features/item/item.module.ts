import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ItemDetailsComponent],
  exports: [ItemDetailsComponent],
})
export class ItemModule {}
