import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Inventory } from './models/inventory';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

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
