import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bot } from './models/bot';

@Injectable({ providedIn: 'root' })
export class BotService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getAllBots(): Observable<Bot[]> {
    return this.http.get<Bot[]>(`${this.apiUrl}/bot/get-all`);
  }

  getUserBots(steamId: string): Observable<Bot[]> {
    return this.http.get<Bot[]>(`${this.apiUrl}/bot/get-of-user/${steamId}`);
  }

  getBot(steamId: string): Observable<Bot> {
    return this.http.get<Bot>(`${this.apiUrl}/bot/get/${steamId}`);
  }

  createBot(bot: Bot): Observable<Bot> {
    return this.http.post<Bot>(`${this.apiUrl}/bot/create`, bot);
  }

  updateBot(bot: Bot): Observable<Bot> {
    return this.http.put<Bot>(`${this.apiUrl}/bot/update/${bot.steamId}`, bot);
  }

  deleteBot(steamId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bot/delete/${steamId}`);
  }
}
