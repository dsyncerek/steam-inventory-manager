import { getRepository } from 'typeorm';
import Inventory from '../entities/Inventory.entity';
import EntityGetException from '../exceptions/EntityGetException';
import EntityUpdateException from '../exceptions/EntityUpdateException';
import SteamService from './Steam.service';

interface InventoryServiceInterface {
  getInventoryBySteamId(steamId: string): Promise<Inventory[]>;
  refreshInventoryBySteamId(steamId: string): Promise<Inventory>;
}

class InventoryService implements InventoryServiceInterface {
  private inventoryRepository = getRepository(Inventory);
  private steamService = new SteamService();

  getInventoryBySteamId = async (steamId: string): Promise<Inventory[]> => {
    try {
      return await this.inventoryRepository.find();
      //return await this.inventoryRepository.findOne({ where: { bot: { steamId } }, relations: ['items'] });
    } catch (e) {
      throw new EntityGetException(e.message);
    }
  };

  refreshInventoryBySteamId = async (steamId: string): Promise<Inventory> => {
    const inventory = await this.steamService.getInventoryBySteamId(steamId);

    try {
      console.log('sda');
      // const x = await this.inventoryRepository.preload(inventory);
      // console.log(x);
      // return x;
      await this.inventoryRepository.save(inventory);
      return inventory;
    } catch (e) {
      throw new EntityUpdateException(e.message);
    }
  };
}

export default InventoryService;
