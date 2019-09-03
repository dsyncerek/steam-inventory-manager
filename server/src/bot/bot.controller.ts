import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionsAllowed } from '../access-control/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../access-control/enums/permissions.enum';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot } from './entity/bot.entity';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get()
  @PermissionsAllowed(PermissionsEnum.BotGetAll)
  async getAllBots(): Promise<Bot[]> {
    return this.botService.getAllBots();
  }

  @Get('user/:steamId')
  @PermissionsAllowed(PermissionsEnum.BotGetAllByUserAny, PermissionsEnum.BotGetAllByUserOwn)
  async getAllUserBots(@Param('steamId') steamId: string): Promise<Bot[]> {
    return this.botService.getUserBots(steamId);
  }

  @Get(':steamId')
  @PermissionsAllowed(PermissionsEnum.BotGetAny, PermissionsEnum.BotGetOwn)
  async getBot(@Param('steamId') steamId: string): Promise<Bot> {
    return this.botService.getBot(steamId);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.BotCreateAny, PermissionsEnum.BotCreateOwn)
  async createBot(@Body() body: CreateBotDto): Promise<Bot> {
    return this.botService.createBot(body);
  }

  @Put(':steamId')
  @PermissionsAllowed(PermissionsEnum.BotUpdateAny, PermissionsEnum.BotUpdateOwn)
  async updateBot(@Param('steamId') steamId: string, @Body() body: UpdateBotDto): Promise<Bot> {
    return this.botService.updateBot(steamId, body);
  }

  @Delete(':steamId')
  @PermissionsAllowed(PermissionsEnum.BotDeleteAny, PermissionsEnum.BotDeleteOwn)
  async deleteBot(@Param('steamId') steamId: string): Promise<void> {
    return this.botService.deleteBot(steamId);
  }
}
