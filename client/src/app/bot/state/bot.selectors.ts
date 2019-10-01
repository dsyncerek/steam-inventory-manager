import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Bot } from '../models/bot';
import { adapter, BotState } from './bot.reducer';

const selectors = adapter.getSelectors();

export const selectBotState = createFeatureSelector<BotState>('bot');

export const selectBotEntities = createSelector(
  selectBotState,
  selectors.selectEntities,
);

export const selectBotIds = createSelector(
  selectBotState,
  selectors.selectIds,
);

export const selectBots = createSelector(
  selectBotState,
  selectors.selectAll,
);

export const selectBot = createSelector(
  selectBotEntities,
  (entities: Dictionary<Bot>, { steamId }): Bot => entities[steamId],
);

export const selectUserBots = createSelector(
  selectBots,
  (bots: Bot[], { steamId }): Bot[] => bots.filter(bot => bot.ownerSteamId === steamId),
);
