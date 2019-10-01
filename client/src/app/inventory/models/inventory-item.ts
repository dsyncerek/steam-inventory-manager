import { Item } from '../../item/models/item';

export interface InventoryItem {
  quantity?: number;
  item: Item;
}
