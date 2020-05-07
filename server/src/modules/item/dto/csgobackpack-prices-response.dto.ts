export class CsGoBackpackPricesResponseDto {
  success: boolean;
  currency: string;
  timestamp: number;
  items_list: Record<string, CsGoBackpackItemDto>;
}

export class CsGoBackpackItemDto {
  name: string;
  marketable: boolean;
  tradable: boolean;
  classid: string;
  icon_url: string;
  icon_url_large: string;
  type: string;
  rarity: string;
  rarity_color: string;
  first_sale_date: string;
  price: {
    '24_hours': CsGoBackpackPriceDto;
    '7_days': CsGoBackpackPriceDto;
    '30_days': CsGoBackpackPriceDto;
    all_time: CsGoBackpackPriceDto;
  };
}

export class CsGoBackpackPriceDto {
  average: number;
  median: number;
  sold: string;
  standard_deviation: string;
  lowest_price: number;
  highest_price: number;
}
