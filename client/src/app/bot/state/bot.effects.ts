import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BotService } from '../bot.service';
import * as botActions from './bot.actions';
import { BotActionTypes } from './bot.actions';

@Injectable()
export class BotEffects {
  constructor(private readonly actions$: Actions, private readonly botService: BotService) {}

  @Effect()
  getAllBots$ = this.actions$.pipe(
    ofType<botActions.GetAllBots>(BotActionTypes.GetAllBots),
    mergeMap(() => {
      return this.botService.getAllBots().pipe(
        map(bots => new botActions.GetAllBotsSuccess({ bots })),
        catchError(error => of(new botActions.GetAllBotsError(error))),
      );
    }),
  );

  @Effect()
  getUserBots$ = this.actions$.pipe(
    ofType<botActions.GetUserBots>(BotActionTypes.GetUserBots),
    mergeMap(({ payload }) => {
      return this.botService.getUserBots(payload.steamId).pipe(
        map(bots => new botActions.GetAllBotsSuccess({ bots })),
        catchError(error => of(new botActions.GetAllBotsError(error))),
      );
    }),
  );

  @Effect()
  getBot$ = this.actions$.pipe(
    ofType<botActions.GetBot>(BotActionTypes.GetBot),
    mergeMap(({ payload }) => {
      return this.botService.getBot(payload.steamId).pipe(
        map(bot => new botActions.GetBotSuccess({ bot })),
        catchError(error => of(new botActions.GetBotError(error))),
      );
    }),
  );

  @Effect()
  createBot$ = this.actions$.pipe(
    ofType<botActions.CreateBot>(BotActionTypes.CreateBot),
    mergeMap(({ payload }) => {
      return this.botService.createBot(payload.bot).pipe(
        map(bot => new botActions.CreateBotSuccess({ bot })),
        catchError(error => of(new botActions.CreateBotError(error))),
      );
    }),
  );

  @Effect()
  updateBot$ = this.actions$.pipe(
    ofType<botActions.UpdateBot>(BotActionTypes.UpdateBot),
    mergeMap(({ payload }) => {
      return this.botService.updateBot(payload.bot).pipe(
        map(bot => new botActions.UpdateBotSuccess({ bot })),
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
        catchError(error => of(new botActions.DeleteBotError(error))),
      );
    }),
  );
}
