import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddBotFormComponent } from './components/add-bot-form/add-bot-form.component';
import { BotListComponent } from './containers/bot-list/bot-list.component';
import { EditBotFormComponent } from './components/edit-bot-form/edit-bot-form.component';

const routes: Route[] = [
  {
    path: '',
    component: BotListComponent,
  },
  {
    path: 'add',
    component: AddBotFormComponent,
  },
  {
    path: 'edit/:steamId',
    component: EditBotFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotRoutingModule {}
