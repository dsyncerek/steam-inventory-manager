import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InventoryItem } from '../inventory/entity/inventory-item.entity';
import { Inventory } from '../inventory/entity/inventory.entity';
import { Item } from '../item/entity/item.entity';
import { SteamInventoryDto } from './dto/steam-inventory.dto';

@Injectable()
export class SteamService {
  async getInventoryBySteamId(steamId: string, appId = 730, contextId = 2): Promise<Inventory> {
    const { assets, descriptions } = await this.getInventoryFromSteamApi(steamId, appId, contextId);

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
      steamId,
      items,
    });
  }

  private async getInventoryFromSteamApi(steamId: string, appId = 730, contextId = 2): Promise<SteamInventoryDto> {
    const url = `http://steamcommunity.com/inventory/${steamId}/${appId}/${contextId}/?count=5000`;
    const response = await axios.get<SteamInventoryDto>(url);
    return response.data;
  }
}
