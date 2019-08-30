import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entity/item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @PermissionsAllowed(PermissionsEnum.GetAllItems)
  async getAllItems(): Promise<Item[]> {
    return this.itemService.getAll();
  }

  @Get(':name')
  @PermissionsAllowed(PermissionsEnum.GetItem)
  async getItemByName(@Param('name') name: string): Promise<Item> {
    return this.itemService.getByName(name);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.CreateItem)
  async createItem(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemService.create(body);
  }

  @Put('/:name')
  @PermissionsAllowed(PermissionsEnum.UpdateItem)
  async updateItemByName(@Param('name') name: string, @Body() body: UpdateItemDto): Promise<Item> {
    return this.itemService.updateByName(name, body);
  }

  @Delete('/:name')
  @PermissionsAllowed(PermissionsEnum.DeleteItem)
  async deleteItemByName(@Param('name') name: string): Promise<void> {
    return this.itemService.deleteByName(name);
  }
}
