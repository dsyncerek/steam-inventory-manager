import { Dictionary } from '@ngrx/entity';
import { Bot } from '../../../features/bot/models/bot';
import { Inventory } from '../../../features/inventory/models/inventory';
import { Item } from '../../../features/item/models/item';

export interface Entities {
  bots?: Dictionary<Bot>;
  inventories?: Dictionary<Inventory>;
  items?: Dictionary<Item>;
}
