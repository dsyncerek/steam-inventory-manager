import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InventoryModule } from '../inventory/inventory.module';
import { SharedModule } from '../shared/shared.module';
import { BotDetailsComponent } from './components/bot-details/bot-details.component';
import { BotListComponent } from './containers/bot-list/bot-list.component';
import { BotEffects } from './state/bot.effects';
import { botReducer } from './state/bot.reducer';

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.forFeature([BotEffects]),
    StoreModule.forFeature('bot', botReducer),
    InventoryModule,
  ],
  declarations: [BotListComponent, BotDetailsComponent],
  exports: [BotListComponent],
})
export class BotModule {}
