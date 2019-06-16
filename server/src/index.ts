import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import { container } from './config/inversify.config';
import ormConfig from './config/orm.config';
import { TYPES } from './constants/types';
import ControllerInterface from './interfaces/Controller.interface';

(async () => {
  await createConnection(ormConfig);
  const controllers: ControllerInterface[] = container.getAll<ControllerInterface>(TYPES.ControllerInterface);
  new App(controllers).listen();
})();
