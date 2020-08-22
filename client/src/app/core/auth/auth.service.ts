import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { selectIsAuthenticated, selectLoggedUser } from '@core/auth/auth.selectors';
import { AppState } from '@core/core.state';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { User } from '@user/models/user';
import { Observable } from 'rxjs';
import { login, logout } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  private readonly tokenStorageKey = 'token';

  private readonly storage: Storage = localStorage;

  public isAuthenticated$ = this.store.select(selectIsAuthenticated);
  public isAuthenticated: boolean;
  public user$ = this.store.select(selectLoggedUser);
  public user: User;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) {
    this.user$.subscribe(user => {
      this.user = user;
      this.isAuthenticated = !!user;
    });
  }

  public async init(): Promise<boolean> {
    return await new Promise<boolean>(resolve => {
      if (this.getToken()) {
        this.getUser().subscribe(
          user => {
            this.store.dispatch(login({ user }));
            resolve(true);
          },
          () => resolve(false),
        );
      } else {
        resolve(false);
      }
    });
  }

  public login(): void {
    window.location.href = `${this.apiUrl}/auth/login`;
  }

  public async handleAuthentication(): Promise<void> {
    const queryParams = new URLSearchParams(window.location.search.substring(1));
    const token = queryParams.get('token');
    this.storage.setItem(this.tokenStorageKey, token);
    await this.init();
    this.router.navigate(['/']).catch(console.error);
  }

  public logout(): void {
    this.storage.removeItem(this.tokenStorageKey);
    this.store.dispatch(logout());
    this.router.navigate(['/']).catch(console.error);
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`);
  }

  public getToken(): string | null {
    return this.storage.getItem(this.tokenStorageKey);
  }
}
