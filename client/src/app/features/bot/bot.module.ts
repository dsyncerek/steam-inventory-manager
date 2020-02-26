import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';
import { InventoryModule } from '../inventory/inventory.module';
import { BotRoutingModule } from './bot-routing.module';
import { BotEffects } from './bot.effects';
import { AddBotFormComponent } from './components/add-bot-form/add-bot-form.component';
import { BotDetailsComponent } from './components/bot-details/bot-details.component';
import { BotLayoutComponent } from './components/bot-layout/bot-layout.component';
import { BotListComponent } from './components/bot-list/bot-list.component';
import { BotSidebarComponent } from './components/bot-sidebar/bot-sidebar.component';
import { EditBotFormComponent } from './components/edit-bot-form/edit-bot-form.component';
import { AddBotDialogComponent } from './containers/add-bot-dialog.component';
import { BotComponent } from './containers/bot.component';
import { BotsComponent } from './containers/bots.component';
import { EditBotDialogComponent } from './containers/edit-bot-dialog.component';

@NgModule({
  imports: [SharedModule, BotRoutingModule, EffectsModule.forFeature([BotEffects]), InventoryModule, LayoutModule],
  declarations: [
    BotDetailsComponent,
    AddBotFormComponent,
    EditBotFormComponent,
    AddBotDialogComponent,
    EditBotDialogComponent,
    BotComponent,
    BotsComponent,
    BotListComponent,
    BotLayoutComponent,
    BotSidebarComponent,
  ],
})
export class BotModule {}
