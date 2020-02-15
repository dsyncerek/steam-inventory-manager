import { ConnectionOptions, getConnectionOptions } from 'typeorm';
import { Bot } from '../modules/bot/entity/bot.entity';
import { InventoryItem } from '../modules/inventory/entity/inventory-item.entity';
import { Inventory } from '../modules/inventory/entity/inventory.entity';
import { Item } from '../modules/item/entity/item.entity';
import { User } from '../modules/user/entity/user.entity';

export async function getTypeOrmConfig(): Promise<ConnectionOptions> {
  return {
    ...(await getConnectionOptions()),
    entities: [Bot, Inventory, InventoryItem, User, Item],
  };
}
