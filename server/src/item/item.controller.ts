import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesAllowed } from '../common/decorators/roles-allowed.decorator';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entity/item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  getAllItems(): Promise<Item[]> {
    return this.itemService.getAll();
  }

  @Get(':name')
  getItemByName(@Param('name') name: string): Promise<Item> {
    return this.itemService.getByName(name);
  }

  @Post()
  @RolesAllowed('create_item')
  createItem(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemService.create(body);
  }

  @Put('/:name')
  @RolesAllowed('update_item')
  updateItemByName(@Param('name') name: string, @Body() body: UpdateItemDto): Promise<Item> {
    return this.itemService.updateByName(name, body);
  }

  @Delete('/:name')
  @RolesAllowed('delete_item')
  deleteItemByName(@Param('name') name: string): Promise<void> {
    return this.itemService.deleteByName(name);
  }
}
