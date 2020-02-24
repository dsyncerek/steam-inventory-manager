import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/core.state';
import { CreateBot } from '../bot.actions';
import { Bot } from '../models/bot';

@Component({
  selector: 'app-add-bot',
  template: `
    <app-add-bot-form (addBot)="onAddBot($event)"></app-add-bot-form>
  `,
})
export class AddBotComponent {
  constructor(private readonly store: Store<AppState>) {}

  onAddBot(bot: Bot): void {
    // todo
    this.store.dispatch(new CreateBot({ bot: { ...bot, ownerSteamId: '76561198201500657' } }));
  }
}
