import { Inventory } from './inventory';
import { Item } from '../../item/models/item';

export interface InventoryItem {
  id: string;
  quantity: number;
  inventory: Inventory;
  item: Item;
}
