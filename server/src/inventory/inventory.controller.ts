import { Controller, Get, Param, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get(':steamId')
  getAllBySteamId(@Param('steamId') steamId: string) {
    return this.inventoryService.getAllBySteamId(steamId);
  };

  @Get(':steamId/:appId/:contextId')
  getBySteamId(@Param('steamId') steamId: string, @Param('appId') appId: number, @Param('contextId') contextId: number) {
    return this.inventoryService.getBySteamId(steamId, appId, contextId);
  };

  @Put(':steamId/:appId/:contextId')
  refreshBySteamId(@Param('steamId') steamId: string, @Param('appId') appId: number, @Param('contextId') contextId: number) {
    return this.inventoryService.refreshBySteamId(steamId, appId, contextId);
  };
}
