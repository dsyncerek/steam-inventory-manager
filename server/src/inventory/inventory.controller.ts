import { Controller, Get, Param, Put } from '@nestjs/common';
import { PermissionsAllowed } from '../common/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../common/enums/permissions.enum';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get(':steamId')
  @PermissionsAllowed(PermissionsEnum.GetAllBotsInventories)
  getAllBotInventoriesBySteamId(@Param('steamId') steamId: string) {
    return this.inventoryService.getAllBySteamId(steamId);
  };

  @Get(':steamId/:appId/:contextId')
  @PermissionsAllowed(PermissionsEnum.GetBotInventory)
  getBotInventoryBySteamId(@Param('steamId') steamId: string, @Param('appId') appId: number, @Param('contextId') contextId: number) {
    return this.inventoryService.getBySteamId(steamId, appId, contextId);
  };

  @Put(':steamId/:appId/:contextId')
  @PermissionsAllowed(PermissionsEnum.RefreshBotInventory)
  refreshBotInventoryBySteamId(@Param('steamId') steamId: string, @Param('appId') appId: number, @Param('contextId') contextId: number) {
    return this.inventoryService.refreshBySteamId(steamId, appId, contextId);
  };
}
