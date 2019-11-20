import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { SteamInventoryDto } from './dto/steam-inventory.dto';

@Injectable()
export class SteamApiService {
  private readonly baseUrl = 'http://steamcommunity.com';

  constructor(private readonly http: HttpService) {}

  public async getInventory(steamId: string, appId = 730, contextId = 2): Promise<SteamInventoryDto> {
    const url = `${this.baseUrl}/inventory/${steamId}/${appId}/${contextId}/?count=5000`;

    return this.http
      .get<SteamInventoryDto>(url)
      .pipe(map(({ data }) => data))
      .toPromise();
  }
}
