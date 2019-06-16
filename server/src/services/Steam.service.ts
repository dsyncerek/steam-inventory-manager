import fetch from 'node-fetch';
import Inventory from '../entities/Inventory.entity';
import InventoryItem from '../entities/InventoryItem.entity';
import Item from '../entities/Item.entity';
import SteamException from '../exceptions/SteamException';

class SteamService {
  public getNameBySteamId = async (steamId: string): Promise<string> => {
    const apiKey = 'F549FDCD9021CC7C171ADE30D322FC08';
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.response.players[0].personaname;
    } catch (e) {
      throw new SteamException();
    }
  };

  public getInventoryBySteamId = async (steamId: string, appId = 730, contextId = 2, lang = 'en'): Promise<Inventory> => {
    const url = `http://steamcommunity.com/inventory/${steamId}/${appId}/${contextId}?l=${lang}`;

    try {
      const response = await fetch(url);
      const { assets, descriptions } = await response.json();

      const inventory = new Inventory({ items: [], count: 0, worth: 0 });

      descriptions
        .filter(description => description.marketable)
        .forEach(description => {
          const inventoryItem = new InventoryItem({
            quantity: 4,
            item: new Item({
              classId: description.classId,
              name: description.market_hash_name,
              appId: description.appid,
              icon: description.icon_url_large || description.icon_url,
              contextId: 2,
            }),
          });

          inventory.items.push(inventoryItem);
          inventory.count += inventoryItem.quantity;
          inventory.worth += inventoryItem.quantity * inventoryItem.item.price;
        });

      return inventory;
    } catch (e) {
      throw new SteamException(e.message);
    }
  };
}

export default SteamService;
