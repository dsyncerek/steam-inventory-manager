import { Body, Controller, Delete, Get, Param, Post, SerializeOptions } from '@nestjs/common';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './entity/inventory.entity';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('get-of-user/:steamId')
  @PermissionsAllowed(PermissionsEnum.InventoryGetAllByUserAny, PermissionsEnum.InventoryGetAllByUserOwn)
  @SerializeOptions({ groups: ['inventory'] })
  async getUserInventories(@Param('steamId') steamId: string): Promise<Inventory[]> {
    return this.inventoryService.getUserInventories(steamId);
  }

  @Get('get-of-bot/:steamId')
  @PermissionsAllowed(PermissionsEnum.InventoryGetAllByBotAny, PermissionsEnum.InventoryGetAllByBotOwn)
  @SerializeOptions({ groups: ['inventory'] })
  async getBotInventories(@Param('steamId') steamId: string): Promise<Inventory[]> {
    return this.inventoryService.getBotInventories(steamId);
  }

  @Get('get/:id')
  @PermissionsAllowed(PermissionsEnum.InventoryGetAny, PermissionsEnum.InventoryGetOwn)
  @SerializeOptions({ groups: ['inventory'] })
  async getInventory(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.getInventory(id);
  }

  @Post('create')
  @PermissionsAllowed(PermissionsEnum.InventoryCreateAny, PermissionsEnum.InventoryCreateOwn)
  @SerializeOptions({ groups: ['inventory'] })
  async createInventory(@Body() body: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.createInventory(body);
  }

  @Get('refresh/:id')
  @PermissionsAllowed(PermissionsEnum.InventoryRefreshAny, PermissionsEnum.InventoryRefreshOwn)
  @SerializeOptions({ groups: ['inventory'] })
  async refreshInventory(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.refreshInventory(id);
  }

  @Delete('delete/:id')
  @PermissionsAllowed(PermissionsEnum.InventoryDeleteAny, PermissionsEnum.InventoryDeleteOwn)
  async deleteInventory(@Param('id') id: string): Promise<void> {
    await this.inventoryService.deleteInventory(id);
  }
}
