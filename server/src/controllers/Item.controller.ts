import { inject } from 'inversify';
import { BaseHttpController, controller, httpMethod, requestBody, requestParam } from 'inversify-express-utils';
import { TYPES } from '../constants/types';
import ItemCreateDto from '../dtos/ItemCreate.dto';
import ItemUpdateDto from '../dtos/ItemUpdate.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import { ItemServiceInterface } from '../services/Item.service';

@controller('/item')
class ItemController extends BaseHttpController {
  @inject(TYPES.ItemServiceInterface)
  private itemService: ItemServiceInterface;

  @httpMethod('get', '/')
  private async getAllItems() {
    const items = await this.itemService.getAllItems();
    return this.json(items);
  };

  @httpMethod('get', '/:name')
  private async getItem(@requestParam('name') name: string) {
    const item = await this.itemService.getItemByName(name);
    return this.json(item);
  };

  @httpMethod('post', '/', validationMiddleware(ItemCreateDto))
  private async createItem(@requestBody() body: ItemCreateDto) {
    await this.itemService.createItem(body);
    return this.ok();
  };

  @httpMethod('put', '/:name', validationMiddleware(ItemUpdateDto))
  private async updateItem(@requestParam('name') name: string, @requestBody() body: ItemUpdateDto) {
    await this.itemService.updateItemByName(name, body);
    return this.ok();
  };

  @httpMethod('delete', '/:name')
  private async deleteItem(@requestParam('name') name: string) {
    await this.itemService.deleteItemByName(name);
    return this.ok();
  };
}

export default ItemController;
