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
  @PermissionsAllowed(PermissionsEnum.ItemGetAll)
  async getAllItems(): Promise<Item[]> {
    return this.itemService.getAllItems();
  }

  @Get(':name')
  @PermissionsAllowed(PermissionsEnum.ItemGetAny)
  async getItem(@Param('name') name: string): Promise<Item> {
    return this.itemService.getItem(name);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.ItemCreateAny)
  async createItem(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(body);
  }

  @Put('/:name')
  @PermissionsAllowed(PermissionsEnum.ItemUpdateAny)
  async updateItem(@Param('name') name: string, @Body() body: UpdateItemDto): Promise<Item> {
    return this.itemService.updateItem(name, body);
  }

  @Delete('/:name')
  @PermissionsAllowed(PermissionsEnum.ItemDeleteAny)
  async deleteItem(@Param('name') name: string): Promise<void> {
    return this.itemService.deleteItem(name);
  }
}
