import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { normalize } from 'normalizr';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as botActions from './bot.actions';
import { BotActionTypes } from './bot.actions';
import { BotService } from './bot.service';
import { AddBotDialogComponent } from './containers/add-bot-dialog.component';
import { EditBotDialogComponent } from './containers/edit-bot-dialog.component';
import { botSchema } from './models/bot';

@Injectable()
export class BotEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly botService: BotService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {}

  @Effect({ dispatch: false })
  openAddBotDialog = this.actions$.pipe(
    ofType(BotActionTypes.OpenAddBotDialog),
    tap(() => this.dialog.open(AddBotDialogComponent)),
  );

  @Effect({ dispatch: false })
  openEditBotDialog = this.actions$.pipe(
    ofType<botActions.OpenEditBotDialog>(BotActionTypes.OpenEditBotDialog),
    tap(({ payload }) => this.dialog.open(EditBotDialogComponent, { data: { steamId: payload.steamId } })),
  );

  @Effect()
  getUserBots$ = this.actions$.pipe(
    ofType<botActions.GetUserBots>(BotActionTypes.GetUserBots),
    mergeMap(({ payload }) => {
      return this.botService.getUserBots(payload.steamId).pipe(
        map(bots => new botActions.GetUserBotsSuccess({ entities: normalize(bots, [botSchema]).entities })),
        catchError(error => of(new botActions.GetUserBotsError(error))),
      );
    }),
  );

  @Effect()
  getBot$ = this.actions$.pipe(
    ofType<botActions.GetBot>(BotActionTypes.GetBot),
    mergeMap(({ payload }) => {
      return this.botService.getBot(payload.steamId).pipe(
        map(bot => new botActions.GetBotSuccess({ entities: normalize(bot, botSchema).entities })),
        catchError(error => of(new botActions.GetBotError(error))),
      );
    }),
  );

  @Effect()
  createBot$ = this.actions$.pipe(
    ofType<botActions.CreateBot>(BotActionTypes.CreateBot),
    mergeMap(({ payload }) => {
      return this.botService.createBot(payload.bot).pipe(
        map(bot => new botActions.CreateBotSuccess({ entities: normalize(bot, botSchema).entities })),
        tap(() => this.snackBar.open('Bot has been created!')),
        catchError(error => of(new botActions.CreateBotError(error))),
      );
    }),
  );

  @Effect()
  updateBot$ = this.actions$.pipe(
    ofType<botActions.UpdateBot>(BotActionTypes.UpdateBot),
    mergeMap(({ payload }) => {
      return this.botService.updateBot(payload.bot).pipe(
        map(bot => new botActions.UpdateBotSuccess({ entities: normalize(bot, botSchema).entities })),
        tap(() => this.snackBar.open('Bot has been updated!')),
        catchError(error => of(new botActions.UpdateBotError(error))),
      );
    }),
  );

  @Effect()
  deleteBot$ = this.actions$.pipe(
    ofType<botActions.DeleteBot>(BotActionTypes.DeleteBot),
    mergeMap(({ payload }) => {
      return this.botService.deleteBot(payload.steamId).pipe(
        map(() => new botActions.DeleteBotSuccess({ steamId: payload.steamId })),
        tap(() => {
          this.snackBar.open('Bot has been deleted!');
          this.router.navigate(['/bot']);
        }),
        catchError(error => of(new botActions.DeleteBotError(error))),
      );
    }),
  );
}
