import { NextFunction, Request, Response, Router } from 'express';
import ItemCreateDto from '../dtos/ItemCreate.dto';
import ItemUpdateDto from '../dtos/ItemUpdate.dto';
import Controller from '../interfaces/Controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import ItemService from '../services/Item.service';

class ItemController implements Controller {
  router = Router();
  itemService = new ItemService();

  constructor() {
    this.initRoutes();
  };

  private initRoutes() {
    this.router.get('/item', this.getAllItems);
    this.router.get('/item/:name', this.getItem);
    this.router.post('/item', validationMiddleware(ItemCreateDto), this.createItem);
    this.router.put('/item/:name', validationMiddleware(ItemUpdateDto), this.updateItem);
    this.router.delete('/item/:name', this.deleteItem);
  };

  private getAllItems = async (request: Request, response: Response, next: NextFunction) => {
    const items = await this.itemService.getAllItems();
    response.send(items);
  };

  private getItem = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name } = request.params;
      const item = await this.itemService.getItemByName(name);
      response.send(item);
    } catch (e) {
      next(e);
    }
  };

  private createItem = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request;
      await this.itemService.createItem(body);
      response.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };

  private updateItem = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body, params: { name } } = request;
      await this.itemService.updateItemByName(name, body);
      response.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };

  private deleteItem = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { name } = request.params;
      await this.itemService.deleteItemByName(name);
      response.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };
}

export default ItemController;
