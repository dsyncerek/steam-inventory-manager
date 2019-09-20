import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InventoryModule } from '../inventory/inventory.module';
import { SharedModule } from '../shared/shared.module';
import { BotRoutingModule } from './bot-routing.module';
import { BotDetailsComponent } from './components/bot-details/bot-details.component';
import { AddBotFormComponent } from './components/add-bot-form/add-bot-form.component';
import { BotListComponent } from './containers/bot-list/bot-list.component';
import { EditBotFormComponent } from './components/edit-bot-form/edit-bot-form.component';
import { BotEffects } from './state/bot.effects';
import { botReducer } from './state/bot.reducer';

@NgModule({
  imports: [
    SharedModule,
    BotRoutingModule,
    EffectsModule.forFeature([BotEffects]),
    StoreModule.forFeature('bot', botReducer),
    InventoryModule,
  ],
  declarations: [BotListComponent, BotDetailsComponent, AddBotFormComponent, EditBotFormComponent],
})
export class BotModule {}
