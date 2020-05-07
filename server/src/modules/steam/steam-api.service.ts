import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { SteamInventoryResponseDto } from './dto/steam-inventory-response.dto';

@Injectable()
export class SteamApiService {
  private readonly baseUrl = 'http://steamcommunity.com';

  constructor(private readonly http: HttpService) {}

  public async getInventory(steamId: string, appId = 730, contextId = 2): Promise<SteamInventoryResponseDto> {
    const url = `${this.baseUrl}/inventory/${steamId}/${appId}/${contextId}/?count=5000`;

    return await this.http
      .get<SteamInventoryResponseDto>(url)
      .pipe(map(({ data }) => data))
      .toPromise();
  }
}
