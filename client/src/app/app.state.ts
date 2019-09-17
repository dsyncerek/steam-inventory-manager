import { BotState } from './bot/state/bot.reducer';
import { InventoryState } from './inventory/state/inventory.reducer';

export interface AppState {
  bot: BotState;
  inventory: InventoryState;
}
