import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../../core/async/async.selectors';
import { AppState } from '../../../core/core.state';
import { BotActionTypes, CreateBot } from '../bot.actions';
import { Bot } from '../models/bot';

@Component({
  selector: 'app-add-bot',
  template: `
    <app-add-bot-form [adding]="adding$ | async" (addBot)="onAddBot($event)"></app-add-bot-form>
  `,
})
export class AddBotComponent {
  adding$ = this.store.select(selectLoading, { types: [BotActionTypes.CreateBot] });

  constructor(private readonly store: Store<AppState>) {}

  onAddBot(bot: Bot): void {
    // todo
    this.store.dispatch(new CreateBot({ bot: { ...bot, ownerSteamId: '76561198201500657' } }));
  }
}
