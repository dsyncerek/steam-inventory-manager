import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello world!</h1>
    <button mat-button>Click me!</button>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {}
