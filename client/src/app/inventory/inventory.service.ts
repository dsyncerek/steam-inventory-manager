import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from '../shared/services/base-data.service';
import { Inventory } from './models/inventory';

@Injectable()
export class InventoryService extends BaseDataService {
  getUserInventories(steamId: string): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/inventory/get-of-user/${steamId}`);
  }

  getBotInventories(steamId: string): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/inventory/get-of-bot/${steamId}`);
  }

  getInventory(steamId: string, appId: number, contextId: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/inventory/get/${steamId}/${appId}/${contextId}`);
  }

  refreshInventory(steamId: string, appId: number, contextId: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/inventory/refresh/${steamId}/${appId}/${contextId}`);
  }
}
