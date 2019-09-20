import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { Bot } from '../../models/bot';
import { GetUserBots } from '../../state/bot.actions';
import { selectUserBots } from '../../state/bot.selectors';

@Component({
  selector: 'app-bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.scss'],
})
export class BotListComponent implements OnInit {
  bots$: Observable<Bot[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new GetUserBots({ steamId: '76561198032411432' }));
    this.bots$ = this.store.select(selectUserBots('76561198032411432'));
  }

  onBotDelete(steamId: string): void {
    console.log(`Delete: ${steamId}`);
  }
}
