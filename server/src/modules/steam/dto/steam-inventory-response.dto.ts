export class SteamInventoryResponseDto {
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
  actions: Array<{ link: string; name: string }> | undefined;
  appid: number;
  background_color: string;
  classid: string;
  commodity: number;
  currency: number;
  descriptions: Array<{ type: string; value: string }>;
  icon_url: string;
  icon_url_large: string;
  instanceid: string;
  market_actions: Array<{ link: string; name: string }> | undefined;
  market_hash_name: string;
  market_name: string;
  market_tradable_restriction: number;
  marketable: number;
  name: string;
  name_color: string;
  tags: Array<{ category: string; internal_name: string; localized_category_name: string; localized_tag_name: string }>;
  tradable: number;
  type: string;
}
