import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot } from './entity/bot.entity';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {
  }

  @Get()
  getAll(): Promise<Bot[]> {
    return this.botService.getAll();
  }

  @Get(':steamId')
  getBySteamId(@Param('steamId') steamId: string): Promise<Bot> {
    return this.botService.getBySteamId(steamId);
  }

  @Post()
  create(@Body() body: CreateBotDto): Promise<Bot> {
    return this.botService.create(body);
  };

  @Put(':steamId')
  updateBySteamId(@Param('steamId') steamId: string, @Body() body: UpdateBotDto): Promise<Bot> {
    return this.botService.updateBySteamId(steamId, body);
  };

  @Delete(':steamId')
  deleteBySteamId(@Param('steamId') steamId: string): Promise<void> {
    return this.botService.deleteBySteamId(steamId);
  };
}
