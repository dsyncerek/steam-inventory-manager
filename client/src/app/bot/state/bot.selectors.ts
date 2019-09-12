import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, BotState } from './bot.reducer';

const selectors = adapter.getSelectors();

export const selectBotState = createFeatureSelector<BotState>('bot');

export const selectBots = createSelector(
  selectBotState,
  selectors.selectAll,
);

export const selectUserBots = (steamId: string) =>
  createSelector(
    selectBots,
    bots => bots.filter(bot => bot.ownerSteamId === steamId),
  );
