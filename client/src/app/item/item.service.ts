import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from '../shared/services/base-data.service';
import { Item } from './models/item';

@Injectable()
export class ItemService extends BaseDataService {
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/item/get-all`);
  }

  getItem(name: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/item/get/${name}`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/item/create`, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/item/update/${item.name}`, item);
  }

  deleteItem(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/item/delete/${name}`);
  }
}
