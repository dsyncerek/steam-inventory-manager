import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entity/item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {
  }

  @Get()
  getAll(): Promise<Item[]> {
    return this.itemService.getAll();
  }

  @Get(':name')
  getByName(@Param('name') name: string): Promise<Item> {
    return this.itemService.getByName(name);
  }

  @Post()
  create(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemService.create(body);
  };

  @Put('/:name')
  updateByName(@Param('name') name: string, @Body() body: UpdateItemDto): Promise<Item> {
    return this.itemService.updateByName(name, body);
  };

  @Delete('/:name')
  deleteByName(@Param('name') name: string): Promise<void> {
    return this.itemService.deleteByName(name);
  };
}
