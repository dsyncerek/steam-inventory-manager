import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { selectIsAuthenticated } from '@core/auth/auth.selectors';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated);
  }
}
