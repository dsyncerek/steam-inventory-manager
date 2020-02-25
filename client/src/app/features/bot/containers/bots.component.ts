import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoading } from '../../../core/async/async.selectors';
import { AppState } from '../../../core/core.state';
import { BotActionTypes, DeleteBot, GetUserBots, OpenAddBotDialog, OpenEditBotDialog } from '../bot.actions';
import { selectUserBots } from '../bot.selectors';
import { Bot } from '../models/bot';

@Component({
  selector: 'app-bots',
  template: `
    <app-bot-list
      [bots]="bots$ | async"
      [loading]="loading$ | async"
      (botAdd)="onBotAdd()"
      (botEdit)="onBotEdit($event)"
      (botDelete)="onBotDelete($event)"
    ></app-bot-list>
  `,
})
export class BotsComponent implements OnInit {
  bots$: Observable<Bot[]>;
  loading$ = this.store.select(selectLoading, { types: [BotActionTypes.GetUserBots, BotActionTypes.GetBot] });

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    // todo
    this.store.dispatch(new GetUserBots({ steamId: '76561198201500657' }));
    this.bots$ = this.store.select(selectUserBots, { steamId: '76561198201500657' });
  }

  onBotAdd(): void {
    this.store.dispatch(new OpenAddBotDialog());
  }

  onBotEdit(steamId: string): void {
    this.store.dispatch(new OpenEditBotDialog({ steamId }));
  }

  onBotDelete(steamId: string): void {
    this.store.dispatch(new DeleteBot({ steamId }));
  }
}
