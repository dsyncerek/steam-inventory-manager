import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { selectLoading } from '../../../core/async/async.selectors';
import { AppState } from '../../../core/core.state';
import { BotActionTypes, CreateBot } from '../bot.actions';
import { Bot } from '../models/bot';

@Component({
  selector: 'app-add-bot-dialog',
  template: ` <app-add-bot-form [adding]="adding$ | async" (addBot)="onAddBot($event)"></app-add-bot-form> `,
})
export class AddBotDialogComponent {
  adding$ = this.store.select(selectLoading, { types: [BotActionTypes.CreateBot] });

  constructor(
    private readonly store: Store<AppState>,
    private readonly dialogRef: MatDialogRef<AddBotDialogComponent>,
  ) {}

  onAddBot(bot: Bot): void {
    // todo
    this.store.dispatch(new CreateBot({ bot: { ...bot, ownerSteamId: '76561198201500657' } }));

    this.adding$
      .pipe(
        filter(adding => !adding),
        first(),
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
