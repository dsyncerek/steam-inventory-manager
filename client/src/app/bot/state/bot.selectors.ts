import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Bot } from '../models/bot';
import { BotState } from './bot.reducer';

export const selectBotState = createFeatureSelector<BotState>('bot');

export const selectBots = createSelector(
  selectBotState,
  (state: BotState): Bot[] => Object.values(state.entities),
);

export const selectUserBots = (steamId: string) =>
  createSelector(
    selectBots,
    (bots: Bot[]): Bot[] => bots.filter(bot => bot.ownerSteamId === steamId),
  );

export const selectBot = (steamId: string) =>
  createSelector(
    selectBots,
    (bots: Bot[]): Bot => bots.find(bot => bot.steamId === steamId),
  );
