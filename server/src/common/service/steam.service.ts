import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { InventoryItem } from '../../inventory/entity/inventory-item.entity';
import { Inventory } from '../../inventory/entity/inventory.entity';
import { Item } from '../../item/entity/item.entity';

@Injectable()
export class SteamService {
  getNameBySteamId = async (steamId: string): Promise<string> => {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.getSteamApiKey()}&steamids=${steamId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.response.players[0].personaname;
  };

  getInventoryBySteamId = async (steamId: string, appId = 730, contextId = 2): Promise<Inventory> => {
    const url = `http://steamcommunity.com/inventory/${steamId}/${appId}/${contextId}/?count=5000`;
    const response = await fetch(url);
    const { assets, descriptions } = await response.json();

    const items = descriptions.map(description => {
      return new InventoryItem({
        quantity: assets.filter(asset => asset.classid === description.classid).length,
        item: new Item({
          contextId,
          appId,
          classId: description.classid,
          name: description.market_hash_name,
          icon: description.icon_url_large || description.icon_url,
        }),
      });
    });

    return new Inventory({
      appId,
      contextId,
      items,
      botSteamId: steamId,
    });
  };

  private getSteamApiKey = () => {
    return process.env.STEAM_API_KEY;
  };
}
