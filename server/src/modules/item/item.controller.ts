import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entity/item.entity';
import { ItemService } from './item.service';

@Controller('items')
@ApiTags('Items')
@ApiBearerAuth()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @PermissionsAllowed(PermissionsEnum.ItemGetAll)
  async getAllItems(): Promise<Item[]> {
    return this.itemService.getAllItems();
  }

  @Get(':classId')
  @PermissionsAllowed(PermissionsEnum.ItemGetAny)
  async getItem(@Param('classId') classId: string): Promise<Item> {
    return this.itemService.getItem(classId);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.ItemCreateAny)
  async createItem(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(body);
  }

  @Patch(':classId')
  @PermissionsAllowed(PermissionsEnum.ItemUpdateAny)
  async updateItem(@Param('classId') classId: string, @Body() body: UpdateItemDto): Promise<Item> {
    return this.itemService.updateItem(classId, body);
  }

  @Delete(':classId')
  @PermissionsAllowed(PermissionsEnum.ItemDeleteAny)
  async deleteItem(@Param('classId') classId: string): Promise<void> {
    await this.itemService.deleteItem(classId);
  }
}
