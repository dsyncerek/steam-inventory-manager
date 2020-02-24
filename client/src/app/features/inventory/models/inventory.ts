import { schema } from 'normalizr';
import { itemSchema } from '../../item/models/item';
import { InventoryItem } from './inventory-item';

export interface Inventory {
  id: string;
  botSteamId: string;
  appId: number;
  contextId: number;
  count: number;
  worth: number;
  items: InventoryItem[];
}

export const inventorySchema = new schema.Entity('inventories', { items: [{ item: itemSchema }] });
