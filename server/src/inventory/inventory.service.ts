import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SteamService } from '../steam/steam.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './entity/inventory.entity';

@Injectable()
export class InventoryService {
  @InjectRepository(Inventory)
  private readonly inventoryRepository: Repository<Inventory>;

  constructor(private readonly steamService: SteamService) {}

  async getUserInventories(steamId: string): Promise<Inventory[]> {
    return this.inventoryRepository.find({ bot: { owner: { steamId } } });
  }

  async getBotInventories(steamId: string): Promise<Inventory[]> {
    return this.inventoryRepository.find({ bot: { steamId } });
  }

  async getInventory(id: string): Promise<Inventory> {
    return this.inventoryRepository.findOneOrFail({ id });
  }

  async createInventory(data: CreateInventoryDto): Promise<Inventory> {
    const { appId, contextId, botSteamId } = data;
    const inventory = await this.steamService.getInventoryBySteamId(botSteamId, appId, contextId);
    await this.inventoryRepository.insert(inventory);
    return this.getInventory(inventory.id);
  }

  async refreshInventory(id: string): Promise<Inventory> {
    const inventory = await this.getInventory(id);
    const { appId, contextId, botSteamId } = inventory;
    const inventoryFromSteam = await this.steamService.getInventoryBySteamId(botSteamId, appId, contextId);
    const inventoryToSave = { ...inventoryFromSteam, id };
    await this.deleteInventory(id);
    await this.inventoryRepository.insert(inventoryToSave);
    return this.getInventory(id);
  }

  async deleteInventory(id: string): Promise<void> {
    await this.inventoryRepository.delete({ id });
  }
}
