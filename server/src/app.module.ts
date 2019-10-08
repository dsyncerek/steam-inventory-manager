import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccessControlModule } from './access-control/access-control.module';
import { PermissionsGuard } from './access-control/guards/permissions.guard';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { rolesConfig } from './config/roles.config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { InventoryModule } from './inventory/inventory.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';

const clientBuildPath = join(__dirname, '../..', 'client/dist');

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: clientBuildPath }),
    TypeOrmModule.forRootAsync({ useFactory: async () => getTypeOrmConfig() }),
    AccessControlModule.register(rolesConfig),
    AuthModule,
    ItemModule,
    BotModule,
    InventoryModule,
    UserModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: PermissionsGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_PIPE, useValue: new ValidationPipe({ skipMissingProperties: true, whitelist: true }) },
  ],
})
export class AppModule {}
