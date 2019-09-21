import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InventoryModule } from '../inventory/inventory.module';
import { SharedModule } from '../shared/shared.module';
import { BotRoutingModule } from './bot-routing.module';
import { AddBotFormComponent } from './components/add-bot-form/add-bot-form.component';
import { BotDetailsComponent } from './components/bot-details/bot-details.component';
import { EditBotFormComponent } from './components/edit-bot-form/edit-bot-form.component';
import { AddBotComponent } from './containers/add-bot/add-bot.component';
import { BotComponent } from './containers/bot/bot.component';
import { BotsComponent } from './containers/bots/bots.component';
import { EditBotComponent } from './containers/edit-bot/edit-bot.component';
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
  declarations: [
    BotDetailsComponent,
    AddBotFormComponent,
    EditBotFormComponent,
    AddBotComponent,
    EditBotComponent,
    BotComponent,
    BotsComponent,
  ],
})
export class BotModule {}
