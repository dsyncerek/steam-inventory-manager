import { botFeatureKey, BotState } from '@bot/bot.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { denormalize } from '../../shared/utils/normalize';
import { selectInventoryEntities } from '../inventory/inventory.selectors';
import { selectItemEntities } from '../item/item.selectors';
import * as fromBot from './bot.reducer';
import { Bot, botSchema } from './models/bot';

export const selectBotState = createFeatureSelector<BotState>(botFeatureKey);

export const selectBotEntities = createSelector(selectBotState, fromBot.selectEntities);

export const selectBotIds = createSelector(selectBotState, fromBot.selectIds);

export const selectAllBots = createSelector(
  selectBotIds,
  selectBotEntities,
  selectInventoryEntities,
  selectItemEntities,
  (ids, bots, inventories, items) => {
    return denormalize<Bot[]>(ids, [botSchema], { bots, inventories, items });
  },
);

export const selectBot = createSelector(
  selectBotEntities,
  selectInventoryEntities,
  selectItemEntities,
  (bots, inventories, items, { steamId }) => {
    return denormalize<Bot>(steamId, botSchema, { bots, inventories, items });
  },
);

export const selectUserBots = createSelector(selectAllBots, filterByOwner);

function filterByOwner(bots: Bot[], { steamId }): Bot[] {
  return bots.filter(bot => bot.ownerSteamId === steamId);
}
