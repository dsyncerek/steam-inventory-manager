import { getConnectionOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Bot } from '../modules/bot/entity/bot.entity';
import { InventoryItem } from '../modules/inventory/entity/inventory-item.entity';
import { Inventory } from '../modules/inventory/entity/inventory.entity';
import { Item } from '../modules/item/entity/item.entity';
import { User } from '../modules/user/entity/user.entity';

export async function getTypeOrmConfig(): Promise<PostgresConnectionOptions> {
  return {
    ...((await getConnectionOptions()) as PostgresConnectionOptions),
    entities: [Bot, Inventory, InventoryItem, User, Item],
    ssl: { rejectUnauthorized: false },
  };
}
