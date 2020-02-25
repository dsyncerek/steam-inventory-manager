import { Body, Controller, Delete, Get, Param, Post, Put, SerializeOptions } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './entity/inventory.entity';
import { InventoryService } from './inventory.service';

@Controller('inventories')
@ApiTags('Inventories')
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('of-user/:steamId')
  @SerializeOptions({ groups: ['inventory'] })
  @PermissionsAllowed(PermissionsEnum.InventoryGetAllByUserAny, PermissionsEnum.InventoryGetAllByUserOwn)
  async getUserInventories(@Param('steamId') steamId: string): Promise<Inventory[]> {
    return this.inventoryService.getUserInventories(steamId);
  }

  @Get('of-bot/:steamId')
  @SerializeOptions({ groups: ['inventory'] })
  @PermissionsAllowed(PermissionsEnum.InventoryGetAllByBotAny, PermissionsEnum.InventoryGetAllByBotOwn)
  async getBotInventories(@Param('steamId') steamId: string): Promise<Inventory[]> {
    return this.inventoryService.getBotInventories(steamId);
  }

  @Get(':id')
  @SerializeOptions({ groups: ['inventory'] })
  @PermissionsAllowed(PermissionsEnum.InventoryGetAny, PermissionsEnum.InventoryGetOwn)
  async getInventory(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.getInventory(id);
  }

  @Post()
  @SerializeOptions({ groups: ['inventory'] })
  @PermissionsAllowed(PermissionsEnum.InventoryCreateAny, PermissionsEnum.InventoryCreateOwn)
  async createInventory(@Body() body: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.createInventory(body);
  }

  @Put(':id/refresh')
  @SerializeOptions({ groups: ['inventory'] })
  @PermissionsAllowed(PermissionsEnum.InventoryRefreshAny, PermissionsEnum.InventoryRefreshOwn)
  async refreshInventory(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.refreshInventory(id);
  }

  @Delete(':id')
  @PermissionsAllowed(PermissionsEnum.InventoryDeleteAny, PermissionsEnum.InventoryDeleteOwn)
  async deleteInventory(@Param('id') id: string): Promise<void> {
    await this.inventoryService.deleteInventory(id);
  }
}
