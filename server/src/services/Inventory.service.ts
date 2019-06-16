import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { TYPES } from '../constants/types';
import Inventory from '../entities/Inventory.entity';
import InventoryItem from '../entities/InventoryItem.entity';
import Item from '../entities/Item.entity';
import EntityGetException from '../exceptions/EntityGetException';
import EntityUpdateException from '../exceptions/EntityUpdateException';
import SteamException from '../exceptions/SteamException';

interface InventoryServiceInterface {
  getInventoryBySteamId(steamId: string): Promise<Inventory>;
  refreshInventoryBySteamId(steamId: string): Promise<Inventory>;
}

@injectable()
class InventoryService implements InventoryServiceInterface {
  @inject(TYPES.InventoryRepository)
  private inventoryRepository: Repository<Inventory>;

  getInventoryBySteamId = async (steamId: string): Promise<Inventory> => {
    try {
      return await this.inventoryRepository.findOneOrFail({ where: { bot: { steamId } }, relations: ['items'] });
    } catch (e) {
      throw new EntityGetException(e.message);
    }
  };

  refreshInventoryBySteamId = async (steamId: string): Promise<Inventory> => {
    try {
      // todo
      return new Inventory();
    } catch (e) {
      console.log(e);
      throw new EntityUpdateException(e.message);
    }
  };
}

export { InventoryServiceInterface };
export default InventoryService;
