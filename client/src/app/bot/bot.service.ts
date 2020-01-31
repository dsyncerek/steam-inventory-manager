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
    return this.http.get<Bot[]>(`${this.apiUrl}/bots`);
  }

  getUserBots(steamId: string): Observable<Bot[]> {
    return this.http.get<Bot[]>(`${this.apiUrl}/bots/of-user/${steamId}`);
  }

  getBot(steamId: string): Observable<Bot> {
    return this.http.get<Bot>(`${this.apiUrl}/bots/${steamId}`);
  }

  createBot(bot: Bot): Observable<Bot> {
    return this.http.post<Bot>(`${this.apiUrl}/bots`, bot);
  }

  updateBot(bot: Bot): Observable<Bot> {
    return this.http.put<Bot>(`${this.apiUrl}/bots/${bot.steamId}`, bot);
  }

  deleteBot(steamId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bots/${steamId}`);
  }
}
