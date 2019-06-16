import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/types';
import ControllerInterface from '../interfaces/Controller.interface';
import { InventoryServiceInterface } from '../services/Inventory.service';

@injectable()
class InventoryController implements ControllerInterface {
  router = Router();

  @inject(TYPES.InventoryServiceInterface)
  private inventoryService: InventoryServiceInterface;

  constructor() {
    this.initRoutes();
  };

  private initRoutes() {
    this.router.get('/inventory/:steamId', this.getInventory);
    this.router.put('/inventory/:steamId', this.refreshInventory);
  };

  private getInventory = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { steamId } = request.params;
      const inventory = await this.inventoryService.getInventoryBySteamId(steamId);
      response.send(inventory);
    } catch (e) {
      next(e);
    }
  };

  private refreshInventory = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { steamId } = request.params;
      const inventory = await this.inventoryService.refreshInventoryBySteamId(steamId);
      response.send(inventory);
    } catch (e) {
      next(e);
    }
  };
}

export default InventoryController;
