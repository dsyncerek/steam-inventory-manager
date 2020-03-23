import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { rolesConfig } from './config/roles.config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { AccessControlModule } from './modules/access-control/access-control.module';
import { PermissionsGuard } from './modules/access-control/guards/permissions.guard';
import { AuthModule } from './modules/auth/auth.module';
import { BotModule } from './modules/bot/bot.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ItemModule } from './modules/item/item.module';
import { UserModule } from './modules/user/user.module';

const clientBuildPath = join(__dirname, '../..', 'client/dist');

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: clientBuildPath }),
    TypeOrmModule.forRootAsync({ useFactory: async () => await getTypeOrmConfig() }),
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
