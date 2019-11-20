import { Injectable } from '@nestjs/common';
import { InventoryItem } from '../inventory/entity/inventory-item.entity';
import { Inventory } from '../inventory/entity/inventory.entity';
import { Item } from '../item/entity/item.entity';
import { SteamApiService } from './steam-api.service';

@Injectable()
export class SteamService {
  constructor(private readonly steamApiService: SteamApiService) {}

  async getInventoryBySteamId(botSteamId: string, appId = 730, contextId = 2): Promise<Inventory> {
    const { assets, descriptions } = await this.steamApiService.getInventory(botSteamId, appId, contextId);

    const aggregatedAssets: Array<{ classId: string; quantity: number }> = [];

    assets.forEach(asset => {
      const item = aggregatedAssets.find(a => a.classId === asset.classid);
      const amount = parseInt(asset.amount);

      if (item) {
        item.quantity += amount;
      } else {
        aggregatedAssets.push({ classId: asset.classid, quantity: amount });
      }
    });

    const items: InventoryItem[] = aggregatedAssets.map(({ quantity, classId }) => {
      const description = descriptions.find(description => description.classid === classId);

      return new InventoryItem({
        quantity,
        item: new Item({
          contextId,
          appId,
          classId,
          name: description.market_hash_name,
          icon: description.icon_url_large || description.icon_url,
        }),
      });
    });

    return new Inventory({
      appId,
      contextId,
      botSteamId,
      items,
    });
  }
}
