import { Component } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public readonly authService: AuthService) {}
}
