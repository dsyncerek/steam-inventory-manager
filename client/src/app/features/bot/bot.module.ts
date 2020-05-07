import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { BotRoutingModule } from '@bot/bot-routing.module';
import { BotEffects } from '@bot/bot.effects';
import { botFeatureKey, botReducer } from '@bot/bot.reducer';
import { AddBotDialogComponent } from '@bot/components/add-bot-dialog/add-bot-dialog.component';
import { AddBotFormComponent } from '@bot/components/add-bot-dialog/add-bot-form/add-bot-form.component';
import { BotDetailsComponent } from '@bot/components/bot-view/bot-details/bot-details.component';
import { BotViewComponent } from '@bot/components/bot-view/bot-view.component';
import { BotListComponent } from '@bot/components/bots-view/bot-list/bot-list.component';
import { BotsViewComponent } from '@bot/components/bots-view/bots-view.component';
import { EditBotDialogComponent } from '@bot/components/edit-bot-dialog/edit-bot-dialog.component';
import { EditBotFormComponent } from '@bot/components/edit-bot-dialog/edit-bot-form/edit-bot-form.component';
import { InventoryModule } from '@inventory/inventory.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(botFeatureKey, botReducer),
    EffectsModule.forFeature([BotEffects]),
    InventoryModule,
    BotRoutingModule,
  ],
  declarations: [
    BotDetailsComponent,
    AddBotFormComponent,
    EditBotFormComponent,
    AddBotDialogComponent,
    EditBotDialogComponent,
    BotListComponent,
    BotsViewComponent,
    BotViewComponent,
  ],
})
export class BotModule {}
