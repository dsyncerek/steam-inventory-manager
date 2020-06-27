import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getBot, getUserBots } from '@bot/bot.actions';
import { selectUserBots } from '@bot/bot.selectors';
import { Bot } from '@bot/models/bot';
import { selectLoading } from '@core/async/async.selectors';
import { AuthService } from '@core/auth/auth.service';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bots-view',
  templateUrl: './bots-view.component.html',
  styleUrls: ['./bots-view.component.scss'],
})
export class BotsViewComponent implements OnInit {
  bots$: Observable<Bot[]>;
  loading$ = this.store.select(selectLoading, { types: [getUserBots.type, getBot.type] });

  constructor(
    private readonly store: Store<AppState>,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    const steamId = this.authService.user.steamId;
    this.store.dispatch(getUserBots({ steamId }));
    this.bots$ = this.store.select(selectUserBots, { steamId });
  }
}
