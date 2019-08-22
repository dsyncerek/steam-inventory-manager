import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot } from './entity/bot.entity';

@Injectable()
export class BotService {
  @InjectRepository(Bot)
  private readonly botRepository: Repository<Bot>;

  getAll = async (): Promise<Bot[]> => {
    return await this.botRepository.find();
  };

  getBySteamId = async (steamId: string): Promise<Bot> => {
    return await this.botRepository.findOneOrFail({ steamId });
  };

  getByUserSteamId = async (steamId: string): Promise<Bot[]> => {
    return await this.botRepository.find({ owner: { steamId } });
  };

  create = async (data: CreateBotDto): Promise<Bot> => {
    const bot = new Bot(data);
    await this.botRepository.insert(bot);
    return await this.getBySteamId(bot.steamId);
  };

  updateBySteamId = async (steamId: string, data: UpdateBotDto): Promise<Bot> => {
    await this.botRepository.update({ steamId }, data);
    return await this.getBySteamId(steamId);
  };

  deleteBySteamId = async (steamId: string): Promise<void> => {
    await this.botRepository.delete({ steamId });
  };
}
