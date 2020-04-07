import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BotViewComponent } from '@bot/components/bot-view/bot-view.component';
import { BotsViewComponent } from '@bot/components/bots-view/bots-view.component';

const routes: Route[] = [
  { path: '', component: BotsViewComponent },
  { path: ':steamId', component: BotViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotRoutingModule {}
