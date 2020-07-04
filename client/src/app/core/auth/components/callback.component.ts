import { Component } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({ template: '' })
export class CallbackComponent {
  constructor(private readonly authService: AuthService) {
    this.authService.handleAuthentication().catch(console.error);
  }
}
