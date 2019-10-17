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

  async getAllBots(): Promise<Bot[]> {
    return this.botRepository.find();
  }

  async getUserBots(steamId: string): Promise<Bot[]> {
    return this.botRepository.find({ owner: { steamId } });
  }

  async getBot(steamId: string): Promise<Bot> {
    return this.botRepository.findOneOrFail({ steamId });
  }

  async createBot(data: CreateBotDto): Promise<void> {
    await this.botRepository.insert(data);
  }

  async updateBot(steamId: string, data: UpdateBotDto): Promise<void> {
    await this.botRepository.update({ steamId }, data);
  }

  async deleteBot(steamId: string): Promise<void> {
    await this.botRepository.delete({ steamId });
  }
}
