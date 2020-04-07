import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { deleteBot, getBot, getUserBots, openAddBotDialog, openEditBotDialog } from '@bot/bot.actions';
import { selectUserBots } from '@bot/bot.selectors';
import { Bot } from '@bot/models/bot';
import { selectLoading } from '@core/async/async.selectors';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bots-view',
  templateUrl: './bots-view.component.html',
  styleUrls: ['./bots-view.component.scss'],
})
export class BotsViewComponent implements OnInit {
  bots$: Observable<Bot[]>;
  loading$ = this.store.select(selectLoading, { types: [getUserBots.type, getBot.type] });

  constructor(private readonly store: Store<AppState>, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    // todo
    this.store.dispatch(getUserBots({ steamId: '76561198201500657' }));
    this.bots$ = this.store.select(selectUserBots, { steamId: '76561198201500657' });
  }

  onBotAdd(): void {
    this.store.dispatch(openAddBotDialog());
  }

  onBotEdit(steamId: string): void {
    this.store.dispatch(openEditBotDialog({ steamId }));
  }

  onBotDelete(steamId: string): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '500px',
        data: { message: `Do you really want to delete bot ${steamId}?` },
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.store.dispatch(deleteBot({ steamId }));
      });
  }
}
