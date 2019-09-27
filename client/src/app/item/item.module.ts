import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemEffects } from './state/item.effects';
import { itemReducer } from './state/item.reducer';

@NgModule({
  imports: [SharedModule, EffectsModule.forFeature([ItemEffects]), StoreModule.forFeature('item', itemReducer)],
  declarations: [ItemDetailsComponent],
  exports: [ItemDetailsComponent],
})
export class ItemModule {}
