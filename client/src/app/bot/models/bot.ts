import { Inventory } from '../../inventory/models/inventory';

export interface Bot {
  steamId: string;
  ownerSteamId: string;
  name?: string;
  login?: string;
  tradeLink?: string;
  is2FA?: boolean;
  isOnline?: boolean;
  inventories?: Inventory[];
}

export const selectBotId = (bot: Bot): string => bot.steamId;
