import { Component } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({ template: `` })
export class LoginComponent {
  constructor(private readonly authService: AuthService) {
    this.authService.login();
  }
}
