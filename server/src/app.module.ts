import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PermissionsGuard } from './access-control/guards/permissions.guard';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { Bot } from './bot/entity/bot.entity';
import { InventoryItem } from './inventory/entity/inventory-item.entity';
import { Inventory } from './inventory/entity/inventory.entity';
import { InventoryModule } from './inventory/inventory.module';
import { Item } from './item/entity/item.entity';
import { ItemModule } from './item/item.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'postgres',
  entities: [Item, Bot, Inventory, InventoryItem, User],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, ItemModule, BotModule, InventoryModule, UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
