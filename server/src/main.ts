import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, {}));
  await app.listen(5000);
})();
