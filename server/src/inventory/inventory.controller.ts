import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './entity/inventory.entity';
import { InventoryService } from './inventory.service';

@Controller('inventories')
@ApiUseTags('Inventories')
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('of-user/:steamId')
  @PermissionsAllowed(PermissionsEnum.InventoryGetAllByUserAny, PermissionsEnum.InventoryGetAllByUserOwn)
  @ApiOkResponse({ type: Inventory, isArray: true })
  async getUserInventories(@Param('steamId') steamId: string): Promise<Inventory[]> {
    return this.inventoryService.getUserInventories(steamId);
  }

  @Get('of-bot/:steamId')
  @PermissionsAllowed(PermissionsEnum.InventoryGetAllByBotAny, PermissionsEnum.InventoryGetAllByBotOwn)
  @ApiOkResponse({ type: Inventory, isArray: true })
  async getBotInventories(@Param('steamId') steamId: string): Promise<Inventory[]> {
    return this.inventoryService.getBotInventories(steamId);
  }

  @Get(':id')
  @PermissionsAllowed(PermissionsEnum.InventoryGetAny, PermissionsEnum.InventoryGetOwn)
  @ApiOkResponse({ type: Inventory })
  async getInventory(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.getInventory(id);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.InventoryCreateAny, PermissionsEnum.InventoryCreateOwn)
  @ApiCreatedResponse({ type: Inventory })
  async createInventory(@Body() body: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.createInventory(body);
  }

  @Put(':id/refresh')
  @PermissionsAllowed(PermissionsEnum.InventoryRefreshAny, PermissionsEnum.InventoryRefreshOwn)
  @ApiOkResponse({ type: Inventory })
  async refreshInventory(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.refreshInventory(id);
  }

  @Delete(':id')
  @PermissionsAllowed(PermissionsEnum.InventoryDeleteAny, PermissionsEnum.InventoryDeleteOwn)
  @ApiNoContentResponse({})
  async deleteInventory(@Param('id') id: string): Promise<void> {
    await this.inventoryService.deleteInventory(id);
  }
}
