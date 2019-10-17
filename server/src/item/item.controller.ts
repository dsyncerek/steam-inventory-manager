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

  @Get('get-all')
  @PermissionsAllowed(PermissionsEnum.ItemGetAll)
  async getAllItems(): Promise<Item[]> {
    return this.itemService.getAllItems();
  }

  @Get('get/:classId')
  @PermissionsAllowed(PermissionsEnum.ItemGetAny)
  async getItem(@Param('classId') classId: string): Promise<Item> {
    return this.itemService.getItem(classId);
  }

  @Post('create')
  @PermissionsAllowed(PermissionsEnum.ItemCreateAny)
  async createItem(@Body() body: CreateItemDto): Promise<Item> {
    await this.itemService.createItem(body);
    return this.itemService.getItem(body.classId);
  }

  @Put('update/:classId')
  @PermissionsAllowed(PermissionsEnum.ItemUpdateAny)
  async updateItem(@Param('classId') classId: string, @Body() body: UpdateItemDto): Promise<Item> {
    await this.itemService.updateItem(classId, body);
    return this.itemService.getItem(classId);
  }

  @Delete('delete/:classId')
  @PermissionsAllowed(PermissionsEnum.ItemDeleteAny)
  async deleteItem(@Param('classId') classId: string): Promise<void> {
    await this.itemService.deleteItem(classId);
  }
}
