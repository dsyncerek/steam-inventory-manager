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
