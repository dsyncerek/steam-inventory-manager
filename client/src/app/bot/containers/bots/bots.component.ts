import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.state';
import { Bot } from '../../models/bot';
import { DeleteBot, GetUserBots } from '../../state/bot.actions';
import { selectUserBots } from '../../state/bot.selectors';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss'],
})
export class BotsComponent implements OnInit {
  bots$: Observable<Bot[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new GetUserBots({ steamId: '76561198201500657' }));
    this.bots$ = this.store.select(selectUserBots, { steamId: '76561198201500657' });
  }

  onBotDelete(steamId: string): void {
    this.store.dispatch(new DeleteBot({ steamId }));
  }
}
