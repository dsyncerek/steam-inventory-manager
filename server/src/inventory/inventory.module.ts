import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SteamService } from '../common/service/steam.service';
import { Inventory } from './entity/inventory.entity';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  providers: [InventoryService, SteamService],
  controllers: [InventoryController],
})
export class InventoryModule {}
