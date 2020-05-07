import * as fromBot from '@bot/bot.reducer';
import { botFeatureKey, BotState } from '@bot/bot.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectBotState = createFeatureSelector<BotState>(botFeatureKey);

export const selectAllBots = createSelector(selectBotState, fromBot.selectAll);

export const selectUserBots = createSelector(selectAllBots, (bots, { steamId }) =>
  bots.filter(bot => bot.ownerSteamId === steamId),
);

export const selectBot = createSelector(selectBotState, (state, { steamId }) => state.entities[steamId]);
