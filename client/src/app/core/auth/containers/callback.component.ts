import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({ template: `` })
export class CallbackComponent {
  constructor(private readonly authService: AuthService) {
    this.authService.handleAuthentication();
  }
}
