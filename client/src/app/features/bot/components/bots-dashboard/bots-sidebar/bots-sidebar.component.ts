import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../core/auth/auth.service';
import { AppState } from '../../../../../core/core.state';
import { openAddBotDialog } from '../../../bot.actions';
import { selectUserBots } from '../../../bot.selectors';
import { Bot } from '../../../models/bot';

@Component({
  selector: 'app-bots-sidebar',
  templateUrl: './bots-sidebar.component.html',
  styleUrls: ['./bots-sidebar.component.scss'],
})
export class BotsSidebarComponent implements OnInit {
  public bots$: Observable<Bot[]>;

  constructor(public readonly authService: AuthService, private readonly store: Store<AppState>) {}

  public ngOnInit(): void {
    this.bots$ = this.store.select(selectUserBots, { steamId: this.authService.user.steamId });
  }

  public addBot(): void {
    this.store.dispatch(openAddBotDialog());
  }
}
