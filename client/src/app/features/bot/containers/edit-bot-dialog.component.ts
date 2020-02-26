import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { selectLoading } from '../../../core/async/async.selectors';
import { AppState } from '../../../core/core.state';
import { BotActionTypes, UpdateBot } from '../bot.actions';
import { selectBot } from '../bot.selectors';
import { Bot } from '../models/bot';

@Component({
  selector: 'app-edit-bot-dialog',
  template: `
    <app-edit-bot-form
      [bot]="bot$ | async"
      [editing]="editing$ | async"
      (editBot)="onEditBot($event)"
    ></app-edit-bot-form>
  `,
})
export class EditBotDialogComponent {
  bot$ = this.store.select(selectBot, { steamId: this.data.steamId });
  editing$ = this.store.select(selectLoading, { types: [BotActionTypes.UpdateBot] });

  constructor(
    private readonly store: Store<AppState>,
    private readonly dialogRef: MatDialogRef<EditBotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { steamId: string },
  ) {}

  onEditBot(bot: Bot): void {
    this.store.dispatch(new UpdateBot({ bot }));

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
