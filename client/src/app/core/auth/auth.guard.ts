import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../core.state';
import { selectIsAuthenticated } from './auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated);
  }
}
