import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}
}
