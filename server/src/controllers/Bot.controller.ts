import { inject } from 'inversify';
import { BaseHttpController, controller, httpMethod, requestBody, requestParam } from 'inversify-express-utils';
import { TYPES } from '../constants/types';
import BotCreateDto from '../dtos/BotCreate.dto';
import BotUpdateDto from '../dtos/BotUpdate.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import { BotServiceInterface } from '../services/Bot.service';

@controller('/bot')
class BotController extends BaseHttpController {
  @inject(TYPES.BotServiceInterface)
  private botService: BotServiceInterface;

  @httpMethod('get', '/')
  private async getAllBots() {
    const bots = await this.botService.getAllBots();
    return this.json(bots);
  };

  @httpMethod('get', '/:steamId')
  private async getBot(@requestParam('steamId') steamId: string) {
    const bot = await this.botService.getBotBySteamId(steamId);
    return this.json(bot);
  };

  @httpMethod('post', '/', validationMiddleware(BotCreateDto))
  private async createBot(@requestBody() body: BotCreateDto) {
    await this.botService.createBot(body);
    return this.ok();
  };

  @httpMethod('put', '/:steamId', validationMiddleware(BotUpdateDto))
  private async updateBot(@requestParam('steamId') steamId: string, @requestBody() body: BotCreateDto) {
    await this.botService.updateBotBySteamId(steamId, body);
    return this.ok();
  };

  @httpMethod('delete', '/:steamId')
  private async deleteBot(@requestParam('steamId') steamId: string) {
    await this.botService.deleteBotBySteamId(steamId);
    return this.ok();
  };
}

export default BotController;
