import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { createBot } from '@bot/bot.actions';
import { Bot } from '@bot/models/bot';
import { selectError, selectLoading } from '@core/async/async.selectors';
import { AuthService } from '@core/auth/auth.service';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-add-bot-dialog',
  templateUrl: './add-bot-dialog.component.html',
  styleUrls: ['./add-bot-dialog.component.scss'],
})
export class AddBotDialogComponent {
  adding$ = this.store.select(selectLoading, { types: [createBot.type] });
  addingError$ = this.store.select(selectError, { types: [createBot.type] });

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store<AppState>,
    private readonly dialogRef: MatDialogRef<AddBotDialogComponent>,
  ) {}

  onAddBot(bot: Bot): void {
    this.store.dispatch(createBot({ bot: { ...bot, ownerSteamId: this.authService.user.steamId } }));

    combineLatest([this.addingError$, this.adding$])
      .pipe(
        filter(([, adding]) => !adding),
        first(),
        filter(([error]) => !error),
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
