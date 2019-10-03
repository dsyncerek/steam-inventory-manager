import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

config();

(async (): Promise<void> => {
  const AppModule = (await import('./app.module')).AppModule;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, {}));
  await app.listen(+process.env.PORT);
})();
