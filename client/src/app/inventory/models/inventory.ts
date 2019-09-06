import { InventoryItem } from './inventory-item';

export interface Inventory {
  id: string;
  botSteamId: string;
  appId: number;
  contextId: number;
  items: InventoryItem[];
  count: number;
  worth: number;
}
