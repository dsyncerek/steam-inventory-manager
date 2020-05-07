import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entity/item.entity';
import { ItemPricesService } from './item-prices.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), HttpModule],
  providers: [ItemService, ItemPricesService],
  controllers: [ItemController],
})
export class ItemModule {}
