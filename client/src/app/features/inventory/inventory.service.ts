import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Inventory } from '@inventory/models/inventory';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getUserInventories(steamId: string): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/inventories/of-user/${steamId}`);
  }

  getBotInventories(steamId: string): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/inventories/of-bot/${steamId}`);
  }

  getInventory(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/inventories/${id}`);
  }

  createInventory(botSteamId: string, appId: number, contextId: number): Observable<Inventory> {
    const body = { botSteamId, appId, contextId };
    return this.http.post<Inventory>(`${this.apiUrl}/inventories`, body);
  }

  refreshInventory(id: string): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiUrl}/inventories/${id}/refresh`, {});
  }

  deleteInventory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inventories/${id}`);
  }
}
