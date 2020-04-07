import { Bot } from '@bot/models/bot';
import { Inventory } from '@inventory/models/inventory';
import { Item } from '@item/models/item';
import { Dictionary } from '@ngrx/entity';

export interface Entities {
  bots?: Dictionary<Bot>;
  inventories?: Dictionary<Inventory>;
  items?: Dictionary<Item>;
}
