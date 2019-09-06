import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from '../shared/services/base-data.service';
import { User } from './models/user';

@Injectable()
export class UserService extends BaseDataService {
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
