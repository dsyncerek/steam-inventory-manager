import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOkResponse({ type: Item, isArray: true })
  async getAllItems(): Promise<Item[]> {
    return this.itemService.getAllItems();
  }

  @Get(':classId')
  @PermissionsAllowed(PermissionsEnum.ItemGetAny)
  @ApiOkResponse({ type: Item })
  async getItem(@Param('classId') classId: string): Promise<Item> {
    return this.itemService.getItem(classId);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.ItemCreateAny)
  @ApiCreatedResponse({ type: Item })
  async createItem(@Body() body: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(body);
  }

  @Patch(':classId')
  @PermissionsAllowed(PermissionsEnum.ItemUpdateAny)
  @ApiOkResponse({ type: Item })
  async updateItem(@Param('classId') classId: string, @Body() body: UpdateItemDto): Promise<Item> {
    return this.itemService.updateItem(classId, body);
  }

  @Delete(':classId')
  @PermissionsAllowed(PermissionsEnum.ItemDeleteAny)
  @ApiNoContentResponse({})
  async deleteItem(@Param('classId') classId: string): Promise<void> {
    await this.itemService.deleteItem(classId);
  }
}
