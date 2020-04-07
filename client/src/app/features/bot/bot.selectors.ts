import { Bot, botSchema } from '@bot/models/bot';
import { AppState } from '@core/core.state';
import { EntitiesState } from '@core/entities/entities.reducer';
import { selectEntitiesState } from '@core/entities/entities.selectors';
import { denormalize } from '@core/entities/normalize';
import { createSelector } from '@ngrx/store';

export const selectBots = createSelector<AppState, EntitiesState, Bot[]>(selectEntitiesState, entities =>
  denormalize(Object.keys(entities.bots), [botSchema], entities),
);

export const selectUserBots = createSelector<AppState, { steamId: string }, Bot[], Bot[]>(
  selectBots,
  (bots, { steamId }) => bots.filter(bot => bot.ownerSteamId === steamId),
);

export const selectBot = createSelector<AppState, { steamId: string }, EntitiesState, Bot | undefined>(
  selectEntitiesState,
  (entities, { steamId }) => denormalize(entities.bots[steamId], botSchema, entities),
);
