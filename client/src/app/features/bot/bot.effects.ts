import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as botActions from '@bot/bot.actions';
import { BotService } from '@bot/bot.service';
import { AddBotDialogComponent } from '@bot/components/add-bot-dialog/add-bot-dialog.component';
import { EditBotDialogComponent } from '@bot/components/edit-bot-dialog/edit-bot-dialog.component';
import { botSchema } from '@bot/models/bot';
import { normalize } from '@core/entities/normalize';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class BotEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly botService: BotService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {}

  openAddBotDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(botActions.openAddBotDialog),
        tap(() => this.dialog.open(AddBotDialogComponent)),
      ),
    { dispatch: false },
  );

  openEditBotDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(botActions.openEditBotDialog),
        tap(({ steamId }) => this.dialog.open(EditBotDialogComponent, { data: { steamId } })),
      ),
    { dispatch: false },
  );

  getUserBots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(botActions.getUserBots),
      mergeMap(({ steamId }) =>
        this.botService.getUserBots(steamId).pipe(
          map(bots => botActions.getUserBotsSuccess({ entities: normalize(bots, [botSchema]) })),
          catchError(error => of(botActions.getUserBotsError(error))),
        ),
      ),
    ),
  );

  getBot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(botActions.getBot),
      mergeMap(({ steamId }) =>
        this.botService.getBot(steamId).pipe(
          map(bot => botActions.getBotSuccess({ entities: normalize(bot, botSchema) })),
          catchError(error => of(botActions.getBotError(error))),
        ),
      ),
    ),
  );

  createBot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(botActions.createBot),
      mergeMap(({ bot }) =>
        this.botService.createBot(bot).pipe(
          map(bot => botActions.createBotSuccess({ entities: normalize(bot, botSchema) })),
          tap(() => this.snackBar.open('Bot has been created!')),
          catchError(error => of(botActions.createBotError(error))),
        ),
      ),
    ),
  );

  updateBot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(botActions.updateBot),
      mergeMap(({ bot }) =>
        this.botService.updateBot(bot).pipe(
          map(bot => botActions.updateBotSuccess({ entities: normalize(bot, botSchema) })),
          tap(() => this.snackBar.open('Bot has been updated!')),
          catchError(error => of(botActions.updateBotError(error))),
        ),
      ),
    ),
  );

  deleteBot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(botActions.deleteBot),
      mergeMap(({ steamId }) =>
        this.botService.deleteBot(steamId).pipe(
          map(() => botActions.deleteBotSuccess({ steamId })),
          tap(() => {
            this.snackBar.open('Bot has been deleted!');
            this.router.navigate(['/bots']);
          }),
          catchError(error => of(botActions.deleteBotError(error))),
        ),
      ),
    ),
  );
}
