import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/core.state';
import { DeleteBot, GetUserBots } from '../bot.actions';
import { selectUserBots } from '../bot.selectors';
import { Bot } from '../models/bot';

@Component({
  selector: 'app-bots',
  template: `
    <app-bot-list [bots]="bots$ | async" (botDelete)="onBotDelete($event)"></app-bot-list>
  `,
})
export class BotsComponent implements OnInit {
  bots$: Observable<Bot[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    // todo
    this.store.dispatch(new GetUserBots({ steamId: '76561198201500657' }));
    this.bots$ = this.store.select(selectUserBots, { steamId: '76561198201500657' });
  }

  onBotDelete(steamId: string): void {
    this.store.dispatch(new DeleteBot({ steamId }));
  }
}
