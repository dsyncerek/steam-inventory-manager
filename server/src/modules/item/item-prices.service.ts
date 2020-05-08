import { HttpService, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { map } from 'rxjs/operators';
import { CsGoBackpackPricesResponseDto } from './dto/csgobackpack-prices-response.dto';
import { ItemService } from './item.service';

@Injectable()
export class ItemPricesService {
  constructor(private readonly itemService: ItemService, private readonly http: HttpService) {
    this.handlePricesUpdate().catch(console.log);
  }

  async getPrices(): Promise<CsGoBackpackPricesResponseDto> {
    const url = `http://csgobackpack.net/api/GetItemsList/v2/`;

    return await this.http
      .get<CsGoBackpackPricesResponseDto>(url)
      .pipe(map(({ data }) => data))
      .toPromise();
  }

  @Interval(1000 * 60 * 60 * 8)
  private async handlePricesUpdate(): Promise<void> {
    const prices = await this.getPrices();
    const items = await this.itemService.getAllItems();

    items.forEach(item => {
      const price = prices.items_list[item.name]?.price?.['7_days']?.average;

      if (price) {
        this.itemService.updateItem(item.classId, { price }).catch(console.log);
      }
    });
  }
}
