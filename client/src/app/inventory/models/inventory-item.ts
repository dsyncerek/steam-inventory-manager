import { Item } from '../../item/models/item';

export interface InventoryItem {
  id: string;
  quantity: number;
  item: Item;
}
