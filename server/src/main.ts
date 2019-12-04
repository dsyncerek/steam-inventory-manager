import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

config();

(async (): Promise<void> => {
  const AppModule = (await import('./app.module')).AppModule;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Steam Inventory Manager API')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('openapi', app, SwaggerModule.createDocument(app, swaggerOptions));

  await app.listen(+process.env.PORT);
})();
