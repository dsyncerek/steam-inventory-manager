import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Bot } from '../../models/bot';
import { CreateBot } from '../../state/bot.actions';

@Component({
  selector: 'app-add-bot',
  templateUrl: './add-bot.component.html',
  styleUrls: ['./add-bot.component.scss'],
})
export class AddBotComponent {
  constructor(private readonly store: Store<AppState>) {}

  onAddBot(bot: Bot): void {
    this.store.dispatch(new CreateBot({ bot: { ...bot, ownerSteamId: '76561198032411432' } }));
  }
}
