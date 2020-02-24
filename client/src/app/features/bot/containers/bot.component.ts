import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/core.state';
import { DeleteBot, GetBot } from '../bot.actions';
import { selectBot } from '../bot.selectors';
import { Bot } from '../models/bot';

@Component({
  selector: 'app-bot',
  template: `
    <app-bot-details [bot]="bot$ | async" (botDelete)="onBotDelete($event)"></app-bot-details>
  `,
})
export class BotComponent implements OnInit {
  bot$: Observable<Bot>;

  constructor(private readonly store: Store<AppState>, private readonly activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const steamId = this.activeRoute.snapshot.params.steamId;
    this.bot$ = this.store.select(selectBot, { steamId });
    this.store.dispatch(new GetBot({ steamId }));
  }

  onBotDelete(steamId: string): void {
    this.store.dispatch(new DeleteBot({ steamId }));
  }
}
