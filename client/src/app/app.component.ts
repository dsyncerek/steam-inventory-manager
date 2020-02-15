import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout>
      <a href="/login">Login</a>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class AppComponent {}
