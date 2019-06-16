import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/types';
import BotCreateDto from '../dtos/BotCreate.dto';
import BotUpdateDto from '../dtos/BotUpdate.dto';
import ControllerInterface from '../interfaces/Controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { BotServiceInterface } from '../services/Bot.service';

@injectable()
class BotController implements ControllerInterface {
  router = Router();

  @inject(TYPES.BotServiceInterface)
  private botService: BotServiceInterface;

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/bot', this.getAllBots);
    this.router.get('/bot/:steamId', this.getBot);
    this.router.post('/bot', validationMiddleware(BotCreateDto), this.createBot);
    this.router.put('/bot/:steamId', validationMiddleware(BotUpdateDto), this.updateBot);
    this.router.delete('/bot/:steamId', this.deleteBot);
  }

  private getAllBots = async (request: Request, response: Response, next: NextFunction) => {
    const bots = await this.botService.getAllBots();
    response.send(bots);
  };

  private getBot = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { steamId } = request.params;
      const bot = await this.botService.getBotBySteamId(steamId);
      response.send(bot);
    } catch (e) {
      next(e);
    }
  };

  private createBot = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request;
      await this.botService.createBot(body);
      response.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };

  private updateBot = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body, params: { steamId } } = request;
      await this.botService.updateBotBySteamId(steamId, body);
      response.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };

  private deleteBot = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { steamId } = request.params;
      await this.botService.deleteBotBySteamId(steamId);
      response.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };
}

export default BotController;
