import { getRepository } from 'typeorm';
import Inventory from '../entities/Inventory.entity';
import EntityGetException from '../exceptions/EntityGetException';
import EntityUpdateException from '../exceptions/EntityUpdateException';

interface InventoryServiceInterface {
  getInventoryBySteamId(steamId: string): Promise<Inventory>;
  refreshInventoryBySteamId(steamId: string): Promise<Inventory>;
}

class InventoryService implements InventoryServiceInterface {
  private inventoryRepository = getRepository(Inventory);

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

export default InventoryService;
