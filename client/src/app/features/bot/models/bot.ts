import { Inventory, inventorySchema } from '@inventory/models/inventory';
import { schema } from 'normalizr';

export interface Bot {
  steamId: string;
  ownerSteamId: string;
  name: string;
  login: string;
  tradeLink: string;
  is2FA: boolean;
  isOnline: boolean;
  inventories: Inventory[];
}

const idAttribute: keyof Bot = 'steamId';
export const botSchema = new schema.Entity('bots', { inventories: [inventorySchema] }, { idAttribute });
export const selectBotId = (bot: Bot): string => bot[idAttribute];
export const botSortComparer = (a: Bot, b: Bot): number => a.login.localeCompare(b.name);
