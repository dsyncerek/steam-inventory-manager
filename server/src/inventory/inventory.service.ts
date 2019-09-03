import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SteamService } from '../steam/steam.service';
import { Inventory } from './entity/inventory.entity';

@Injectable()
export class InventoryService {
  @InjectRepository(Inventory)
  private readonly inventoryRepository: Repository<Inventory>;

  constructor(private readonly steamService: SteamService) {}

  async getUserInventories(steamId: string): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: { bot: { owner: { steamId } } },
      relations: ['items'],
    });
  }

  async getBotInventories(steamId: string): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: { bot: { steamId } },
      relations: ['items'],
    });
  }

  async getInventory(steamId: string, appId: number, contextId: number): Promise<Inventory> {
    return this.inventoryRepository.findOneOrFail({
      where: { bot: { steamId }, appId, contextId },
      relations: ['items'],
    });
  }

  async refreshInventory(steamId: string, appId: number, contextId: number): Promise<Inventory> {
    const inventory = await this.steamService.getInventoryBySteamId(steamId, appId, contextId);
    await this.deleteInventory(steamId, appId, contextId);
    await this.inventoryRepository.save(inventory);
    return this.getInventory(steamId, appId, contextId);
  }

  async deleteInventory(steamId: string, appId: number, contextId: number): Promise<void> {
    await this.inventoryRepository.delete({ bot: { steamId }, appId, contextId });
  }
}
