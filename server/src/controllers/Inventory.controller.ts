import { inject } from 'inversify';
import { BaseHttpController, controller, httpMethod, requestParam } from 'inversify-express-utils';
import { TYPES } from '../constants/types';
import { InventoryServiceInterface } from '../services/Inventory.service';

@controller('/inventory')
class InventoryController extends BaseHttpController {
  @inject(TYPES.InventoryServiceInterface)
  private inventoryService: InventoryServiceInterface;

  @httpMethod('get', '/:steamId')
  private async getInventory(@requestParam('steamId') steamId: string) {
    const inventory = await this.inventoryService.getInventoryBySteamId(steamId);
    return this.json(inventory);
  };

  @httpMethod('put', '/:steamId')
  private async refreshInventory(@requestParam('steamId') steamId: string) {
    const inventory = await this.inventoryService.refreshInventoryBySteamId(steamId);
    return this.json(inventory);
  };
}

export default InventoryController;
