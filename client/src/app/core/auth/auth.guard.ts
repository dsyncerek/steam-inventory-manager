import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { selectIsAuthenticated } from '@core/auth/auth.selectors';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store<AppState>, private readonly router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      tap(is => {
        if (!is) {
          this.router.navigate(['/']).catch(console.error);
        }
      }),
    );
  }
}
