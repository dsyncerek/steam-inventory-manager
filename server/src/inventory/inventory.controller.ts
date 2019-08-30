import { Controller, Get, Param, Put } from '@nestjs/common';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { Inventory } from './entity/inventory.entity';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get(':steamId')
  @PermissionsAllowed(PermissionsEnum.GetAllBotInventories)
  async getAllBotInventoriesBySteamId(@Param('steamId') steamId: string): Promise<Inventory[]> {
    return this.inventoryService.getAllBySteamId(steamId);
  }

  @Get(':steamId/:appId/:contextId')
  @PermissionsAllowed(PermissionsEnum.GetBotInventory)
  async getBotInventoryBySteamId(
    @Param('steamId') steamId: string,
    @Param('appId') appId: number,
    @Param('contextId') contextId: number,
  ): Promise<Inventory> {
    return this.inventoryService.getBySteamId(steamId, appId, contextId);
  }

  @Put(':steamId/:appId/:contextId')
  @PermissionsAllowed(PermissionsEnum.RefreshBotInventory)
  async refreshBotInventoryBySteamId(
    @Param('steamId') steamId: string,
    @Param('appId') appId: number,
    @Param('contextId') contextId: number,
  ): Promise<Inventory> {
    return this.inventoryService.refreshBySteamId(steamId, appId, contextId);
  }
}
