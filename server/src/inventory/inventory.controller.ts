import { Controller, Get, Param, Put } from '@nestjs/common';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { Inventory } from './entity/inventory.entity';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('user/:steamId')
  @PermissionsAllowed(PermissionsEnum.InventoryGetAllByUserAny, PermissionsEnum.InventoryGetAllByUserOwn)
  async getAllUserInventories(@Param('steamId') steamId: string): Promise<Inventory[]> {
    return this.inventoryService.getUserInventories(steamId);
  }

  @Get(':steamId')
  @PermissionsAllowed(PermissionsEnum.InventoryGetAllByBotAny, PermissionsEnum.InventoryGetAllByBotOwn)
  async getAllBotInventories(@Param('steamId') steamId: string): Promise<Inventory[]> {
    return this.inventoryService.getBotInventories(steamId);
  }

  @Get(':steamId/:appId/:contextId')
  @PermissionsAllowed(PermissionsEnum.InventoryGetAny, PermissionsEnum.InventoryGetOwn)
  async getInventory(
    @Param('steamId') steamId: string,
    @Param('appId') appId: number,
    @Param('contextId') contextId: number,
  ): Promise<Inventory> {
    return this.inventoryService.getInventory(steamId, appId, contextId);
  }

  @Put(':steamId/:appId/:contextId')
  @PermissionsAllowed(PermissionsEnum.InventoryRefreshAny, PermissionsEnum.InventoryRefreshOwn)
  async refreshInventory(
    @Param('steamId') steamId: string,
    @Param('appId') appId: number,
    @Param('contextId') contextId: number,
  ): Promise<Inventory> {
    return this.inventoryService.refreshInventory(steamId, appId, contextId);
  }
}
