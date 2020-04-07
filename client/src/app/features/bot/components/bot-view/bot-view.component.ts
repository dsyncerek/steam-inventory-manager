import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { deleteBot, getBot, openEditBotDialog } from '@bot/bot.actions';
import { selectBot } from '@bot/bot.selectors';
import { Bot } from '@bot/models/bot';
import { selectLoading } from '@core/async/async.selectors';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bot-view',
  templateUrl: './bot-view.component.html',
  styleUrls: ['./bot-view.component.scss'],
})
export class BotViewComponent implements OnInit {
  bot$: Observable<Bot>;
  loading$ = this.store.select(selectLoading, { types: [getBot.type] });

  constructor(
    private readonly store: Store<AppState>,
    private readonly activeRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const steamId = this.activeRoute.snapshot.params.steamId;
    this.bot$ = this.store.select(selectBot, { steamId });
    this.store.dispatch(getBot({ steamId }));
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
