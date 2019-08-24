/* eslint-disable @typescript-eslint/no-explicit-any */

export class SteamInventoryDto {
  total_inventory_count: number;
  success: number;
  assets: SteamAssetDto[];
  descriptions: SteamDescriptionDto[];
}

class SteamAssetDto {
  amount: string;
  appid: number;
  assetid: string;
  classid: string;
  contextid: string;
  instanceid: string;
}

class SteamDescriptionDto {
  actions: any[];
  appid: number;
  background_color: string;
  classid: string;
  commodity: number;
  currency: number;
  descriptions: any[];
  icon_url: string;
  icon_url_large: string;
  instanceid: string;
  market_actions: any[];
  market_hash_name: string;
  market_name: string;
  market_tradable_restriction: number;
  marketable: number;
  name: string;
  name_color: string;
  tags: any[];
  tradable: number;
  type: string;
}
