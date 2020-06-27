import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { selectIsAuthenticated } from '@core/auth/auth.selectors';
import { AppState } from '@core/core.state';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { getUrlSearchParams } from '@shared/utils/url.utils';
import { User } from '@user/models/user';
import { Observable } from 'rxjs';
import { login, logout } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenStorageKey = 'token';
  private readonly storage: Storage = localStorage;

  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  isAuthenticated = false;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) {
    this.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  async init(): Promise<boolean> {
    return await new Promise<boolean>(resolve => {
      if (this.getToken()) {
        this.getUser().subscribe(user => {
          this.store.dispatch(login({ user }));
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }

  login(): void {
    window.location.href = `${this.apiUrl}/auth/login`;
  }

  async handleAuthentication(): Promise<void> {
    const { token } = getUrlSearchParams(window.location.search);
    this.storage.setItem(this.tokenStorageKey, token);
    await this.init();
    this.router.navigate(['/']);
  }

  logout(): void {
    this.storage.removeItem(this.tokenStorageKey);
    this.store.dispatch(logout());
    this.router.navigate(['/']);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`);
  }

  getToken(): string | null {
    return this.storage.getItem(this.tokenStorageKey);
  }
}
