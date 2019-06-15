import { getRepository } from 'typeorm';
import BotCreateDto from '../dtos/BotCreate.dto';
import BotUpdateDto from '../dtos/BotUpdate.dto';
import Bot from '../entities/Bot.entity';
import Inventory from '../entities/Inventory.entity';
import EntityCreateException from '../exceptions/EntityCreateException';
import EntityDeleteException from '../exceptions/EntityDeleteException';
import EntityGetException from '../exceptions/EntityGetException';
import EntityUpdateException from '../exceptions/EntityUpdateException';

interface BotServiceInterface {
  getAllBots(): Promise<Bot[]>;
  getBotBySteamId(steamId: string): Promise<Bot>;
  createBot(data: BotCreateDto): Promise<void>;
  updateBotBySteamId(steamId: string, data: BotUpdateDto): Promise<void>;
  deleteBotBySteamId(steamId: string): Promise<void>;
}

class BotService implements BotServiceInterface {
  private botRepository = getRepository(Bot);
  private inventoryRepository = getRepository(Inventory);

  public getAllBots = async (): Promise<Bot[]> => {
    return await this.botRepository.find();
  };

  public getBotBySteamId = async (steamId: string): Promise<Bot> => {
    try {
      return await this.botRepository.findOneOrFail({ where: { steamId } });
    } catch (e) {
      throw new EntityGetException(e.message);
    }
  };

  public createBot = async (data: BotCreateDto): Promise<void> => {
    try {
      const inventory = this.inventoryRepository.create({ count: 0, worth: 0 });
      const bot = this.botRepository.create({ ...data, inventory });
      await this.botRepository.save(bot);
    } catch (e) {
      throw new EntityCreateException(e.message);
    }
  };

  public updateBotBySteamId = async (steamId: string, data: BotUpdateDto): Promise<void> => {
    try {
      await this.botRepository.update({ steamId }, { ...data });
    } catch (e) {
      throw new EntityUpdateException(e.message);
    }
  };

  public deleteBotBySteamId = async (steamId: string): Promise<void> => {
    try {
      await this.botRepository.delete({ steamId });
    } catch (e) {
      throw new EntityDeleteException(e.message);
    }
  };
}

export default BotService;
