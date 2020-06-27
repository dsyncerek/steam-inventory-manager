import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getBot } from '@bot/bot.actions';
import { selectBot } from '@bot/bot.selectors';
import { Bot } from '@bot/models/bot';
import { selectLoading } from '@core/async/async.selectors';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bot-view',
  templateUrl: './bot-view.component.html',
  styleUrls: ['./bot-view.component.scss'],
})
export class BotViewComponent implements OnInit {
  bot$: Observable<Bot>;
  loading$ = this.store.select(selectLoading, { types: [getBot.type] });
  steamId = this.activeRoute.snapshot.params.steamId;

  constructor(private readonly store: Store<AppState>, private readonly activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.bot$ = this.store.select(selectBot, { steamId: this.steamId });
    this.store.dispatch(getBot({ steamId: this.steamId }));
  }
}
