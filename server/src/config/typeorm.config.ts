import { ConnectionOptions, getConnectionOptions } from 'typeorm';
import { Bot } from '../bot/entity/bot.entity';
import { InventoryItem } from '../inventory/entity/inventory-item.entity';
import { Inventory } from '../inventory/entity/inventory.entity';
import { Item } from '../item/entity/item.entity';
import { User } from '../user/entity/user.entity';

export async function getTypeOrmConfig(): Promise<ConnectionOptions> {
  return {
    ...(await getConnectionOptions()),
    entities: [Bot, Inventory, InventoryItem, User, Item],
  };
}
