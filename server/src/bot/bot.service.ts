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

  getAllBots = async (): Promise<Bot[]> => {
    return this.botRepository.find();
  };

  getUserBots = async (steamId: string): Promise<Bot[]> => {
    return this.botRepository.find({ owner: { steamId } });
  };

  getBot = async (steamId: string): Promise<Bot> => {
    return this.botRepository.findOneOrFail({ steamId });
  };

  createBot = async (data: CreateBotDto): Promise<Bot> => {
    const bot = new Bot(data);
    await this.botRepository.insert(bot);
    return this.getBot(bot.steamId);
  };

  updateBot = async (steamId: string, data: UpdateBotDto): Promise<Bot> => {
    await this.botRepository.update({ steamId }, data);
    return this.getBot(steamId);
  };

  deleteBot = async (steamId: string): Promise<void> => {
    await this.botRepository.delete({ steamId });
  };
}
