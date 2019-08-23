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

  getAllBySteamId = async (steamId: string): Promise<Inventory[]> => {
    return await this.inventoryRepository.find({
      where: { bot: { steamId } },
      relations: ['items'],
    });
  };

  getBySteamId = async (steamId: string, appId: number, contextId: number): Promise<Inventory> => {
    return await this.inventoryRepository.findOneOrFail({
      where: { bot: { steamId }, appId, contextId },
      relations: ['items'],
    });
  };

  refreshBySteamId = async (steamId: string, appId: number, contextId: number): Promise<Inventory> => {
    const inventory = await this.steamService.getInventoryBySteamId(steamId, appId, contextId);
    await this.deleteBySteamId(steamId, appId, contextId);
    await this.inventoryRepository.save(inventory);
    return this.getBySteamId(steamId, appId, contextId);
  };

  deleteBySteamId = async (steamId: string, appId: number, contextId: number): Promise<void> => {
    await this.inventoryRepository.delete({ bot: { steamId }, appId, contextId });
  };
}
