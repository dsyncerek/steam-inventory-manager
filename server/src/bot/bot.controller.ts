import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionsAllowed } from '../common/decorators/permissions-allowed.decorator';
import { PermissionsEnum } from '../common/enums/permissions.enum';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot } from './entity/bot.entity';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get()
  @PermissionsAllowed(PermissionsEnum.GetAllBots)
  getAllBots(): Promise<Bot[]> {
    return this.botService.getAll();
  }

  @Get('user/:steamId')
  @PermissionsAllowed(PermissionsEnum.GetAllUserBots)
  getAllUserBotsBySteamId(@Param('steamId') steamId: string): Promise<Bot[]> {
    return this.botService.getByUserSteamId(steamId);
  }

  @Get(':steamId')
  @PermissionsAllowed(PermissionsEnum.GetBot)
  getBotBySteamId(@Param('steamId') steamId: string): Promise<Bot> {
    return this.botService.getBySteamId(steamId);
  }

  @Post()
  @PermissionsAllowed(PermissionsEnum.CreateBot)
  createBot(@Body() body: CreateBotDto): Promise<Bot> {
    return this.botService.create(body);
  };

  @Put(':steamId')
  @PermissionsAllowed(PermissionsEnum.UpdateBot)
  updateBotBySteamId(@Param('steamId') steamId: string, @Body() body: UpdateBotDto): Promise<Bot> {
    return this.botService.updateBySteamId(steamId, body);
  };

  @Delete(':steamId')
  @PermissionsAllowed(PermissionsEnum.DeleteBot)
  deleteBotBySteamId(@Param('steamId') steamId: string): Promise<void> {
    return this.botService.deleteBySteamId(steamId);
  };
}
