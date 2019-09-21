import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddBotComponent } from './containers/add-bot/add-bot.component';
import { BotComponent } from './containers/bot/bot.component';
import { BotsComponent } from './containers/bots/bots.component';
import { EditBotComponent } from './containers/edit-bot/edit-bot.component';

const routes: Route[] = [
  {
    path: '',
    component: BotsComponent,
  },
  {
    path: 'add',
    component: AddBotComponent,
  },
  {
    path: 'edit/:steamId',
    component: EditBotComponent,
  },
  {
    path: ':steamId',
    component: BotComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotRoutingModule {}
