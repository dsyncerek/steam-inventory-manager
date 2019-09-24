import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { Bot } from '../../models/bot';
import { GetBot } from '../../state/bot.actions';
import { selectBot } from '../../state/bot.selectors';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
})
export class BotComponent implements OnInit {
  bot$: Observable<Bot>;

  constructor(private readonly store: Store<AppState>, private readonly activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const steamId = this.activeRoute.snapshot.params.steamId;
    this.bot$ = this.store.select(selectBot(steamId));
    this.store.dispatch(new GetBot({ steamId }));
  }

  onBotDelete(steamId: string): void {
    console.log(`Delete: ${steamId}`);
  }
}
