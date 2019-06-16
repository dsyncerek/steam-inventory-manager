import 'dotenv/config';
import 'reflect-metadata';
import { json, urlencoded } from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { createConnection } from 'typeorm';
import { container } from './config/inversify.config';
import ormConfig from './config/orm.config';
import errorMiddleware from './middlewares/error.middleware';

(async () => {
  await createConnection(ormConfig);
  const server = new InversifyExpressServer(container);

  server.setConfig(app => {
    app.use(urlencoded({ extended: false }));
    app.use(json());
  });

  server.setErrorConfig(app => {
    app.use(errorMiddleware);
  });

  server.build().listen(process.env.PORT);
})();
