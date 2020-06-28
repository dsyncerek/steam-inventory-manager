import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { updateBot } from '@bot/bot.actions';
import { selectBot } from '@bot/bot.selectors';
import { Bot } from '@bot/models/bot';
import { selectError, selectLoading } from '@core/async/async.selectors';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { requestFulfilled } from '../../../../core/async/utils/request-fulfilled';

@Component({
  selector: 'app-edit-bot-dialog',
  templateUrl: './edit-bot-dialog.component.html',
  styleUrls: ['./edit-bot-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBotDialogComponent {
  bot$ = this.store.select(selectBot, { steamId: this.data.steamId });
  editing$ = this.store.select(selectLoading, { types: [updateBot.type] });
  editingError$ = this.store.select(selectError, { types: [updateBot.type] });

  constructor(
    private readonly store: Store<AppState>,
    private readonly dialogRef: MatDialogRef<EditBotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { steamId: string },
  ) {}

  onEditBot(bot: Bot): void {
    this.store.dispatch(updateBot({ bot }));

    requestFulfilled(this.editing$, this.editingError$).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
