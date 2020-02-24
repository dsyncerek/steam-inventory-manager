import { schema } from 'normalizr';
import { Inventory, inventorySchema } from '../../inventory/models/inventory';

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

export const botSchema = new schema.Entity('bots', { inventories: [inventorySchema] }, { idAttribute: 'steamId' });
