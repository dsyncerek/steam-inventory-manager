import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../interfaces/Controller.interface';
import InventoryService from '../services/Inventory.service';

class InventoryController implements Controller {
  router = Router();
  inventoryService = new InventoryService();

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
