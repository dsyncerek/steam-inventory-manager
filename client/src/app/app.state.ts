import { BotState } from './bot/state/bot.reducer';
import { InventoryState } from './inventory/state/inventory.reducer';
import { ItemState } from './item/state/item.reducer';

export interface AppState {
  bot: BotState;
  inventory: InventoryState;
  item: ItemState;
}
