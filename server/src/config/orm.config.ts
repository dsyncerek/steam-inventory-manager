import { ConnectionOptions } from 'typeorm';
import Bot from "../entities/Bot.entity";
import Inventory from '../entities/Inventory.entity';
import InventoryItem from "../entities/InventoryItem.entity";
import Item from "../entities/Item.entity";

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Bot, Item, InventoryItem, Inventory],
  synchronize: true,
};

export default ormConfig;
