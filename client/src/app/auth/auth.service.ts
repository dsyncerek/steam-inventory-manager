import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../user/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  login(): void {
    window.location.href = `${this.apiUrl}/auth/login`;
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = `/`;
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  handleAuthentication(): void {
    const { token } = this.searchToObject(window.location.search);

    if (token) {
      const url = location.origin + location.pathname;
      history.replaceState(null, 'xd', url);
      localStorage.setItem('token', token);
    }
  }

  private searchToObject(search: string): any {
    if (!search) {
      return {};
    }

    return search
      .slice(1)
      .split('&')
      .map(p => p.split('='))
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
  }
}
