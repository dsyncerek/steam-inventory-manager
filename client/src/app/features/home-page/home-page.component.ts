import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  constructor(public authService: AuthService) {}
}
