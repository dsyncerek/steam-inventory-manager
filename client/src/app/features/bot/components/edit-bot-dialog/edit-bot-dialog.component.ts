import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { updateBot } from '@bot/bot.actions';
import { selectBot } from '@bot/bot.selectors';
import { Bot } from '@bot/models/bot';
import { selectLoading } from '@core/async/async.selectors';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-bot-dialog',
  templateUrl: './edit-bot-dialog.component.html',
  styleUrls: ['./edit-bot-dialog.component.scss'],
})
export class EditBotDialogComponent {
  bot$ = this.store.select(selectBot, { steamId: this.data.steamId });
  editing$ = this.store.select(selectLoading, { types: [updateBot.type] });

  constructor(
    private readonly store: Store<AppState>,
    private readonly dialogRef: MatDialogRef<EditBotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { steamId: string },
  ) {}

  onEditBot(bot: Bot): void {
    this.store.dispatch(updateBot({ bot }));

    this.editing$
      .pipe(
        filter(editing => !editing),
        first(),
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
