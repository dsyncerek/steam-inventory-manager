import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import ormConfig from './config/orm.config';
import BotController from './controllers/Bot.controller';
import InventoryController from './controllers/Inventory.controller';
import ItemController from './controllers/Item.controller';

(async () => {
  await createConnection(ormConfig);

  new App([
    new BotController(),
    new ItemController(),
    new InventoryController(),
  ]).listen();
})();
