import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bot } from '@bot/models/bot';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BotService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public getAllBots(): Observable<Bot[]> {
    return this.http.get<Bot[]>(`${this.apiUrl}/bots`);
  }

  public getUserBots(steamId: string): Observable<Bot[]> {
    return this.http.get<Bot[]>(`${this.apiUrl}/bots/of-user/${steamId}`);
  }

  public getBot(steamId: string): Observable<Bot> {
    return this.http.get<Bot>(`${this.apiUrl}/bots/${steamId}`);
  }

  public createBot(bot: Bot): Observable<Bot> {
    return this.http.post<Bot>(`${this.apiUrl}/bots`, bot);
  }

  public updateBot(bot: Bot): Observable<Bot> {
    return this.http.patch<Bot>(`${this.apiUrl}/bots/${bot.steamId}`, bot);
  }

  public deleteBot(steamId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bots/${steamId}`);
  }
}
