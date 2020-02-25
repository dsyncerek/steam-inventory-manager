import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BotLayoutComponent } from './components/bot-layout/bot-layout.component';
import { BotComponent } from './containers/bot.component';
import { BotsComponent } from './containers/bots.component';

const routes: Route[] = [
  {
    path: '',
    component: BotLayoutComponent,
    children: [
      { path: '', component: BotsComponent },
      { path: ':steamId', component: BotComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotRoutingModule {}
