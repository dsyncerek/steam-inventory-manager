import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/get-all`);
  }

  getUser(steamId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/get/${steamId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user/create`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/update/${user.steamId}`, user);
  }

  deleteUser(steamId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/delete/${steamId}`);
  }
}
