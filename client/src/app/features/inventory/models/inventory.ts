import { InventoryItem } from '@inventory/models/inventory-item';
import { itemSchema } from '@item/models/item';
import { schema } from 'normalizr';

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
