import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { TYPES } from '../constants/types';
import BotCreateDto from '../dtos/BotCreate.dto';
import BotUpdateDto from '../dtos/BotUpdate.dto';
import Bot from '../entities/Bot.entity';
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

@injectable()
class BotService implements BotServiceInterface {
  @inject(TYPES.BotRepository)
  private botRepository: Repository<Bot>;

  public getAllBots = async (): Promise<Bot[]> => {
    return await this.botRepository.find();
  };

  public getBotBySteamId = async (steamId: string): Promise<Bot> => {
    try {
      return await this.botRepository.findOneOrFail({ steamId });
    } catch (e) {
      throw new EntityGetException(e.message);
    }
  };

  public createBot = async (data: BotCreateDto): Promise<void> => {
    try {
      const bot = new Bot({ ...data });
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

export { BotServiceInterface };
export default BotService;
