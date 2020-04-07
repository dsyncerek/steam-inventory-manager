import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { getUrlSearchParams } from '@shared/utils/url.utils';
import { User } from '@user/models/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenStorageKey = 'token';
  private readonly storage: Storage = localStorage;

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  login(): void {
    window.location.href = `${this.apiUrl}/auth/login`;
  }

  handleAuthentication(): void {
    const { token } = getUrlSearchParams(window.location.search);
    this.storage.setItem(this.tokenStorageKey, token);
    this.router.navigate(['/']);
  }

  logout(): void {
    this.storage.removeItem(this.tokenStorageKey);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`);
  }

  getToken(): string | null {
    return this.storage.getItem(this.tokenStorageKey);
  }
}
