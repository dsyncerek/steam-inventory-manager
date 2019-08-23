import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SteamModule } from '../steam/steam.module';
import { Inventory } from './entity/inventory.entity';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]), SteamModule],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
