import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSummaryComponent {
  public defaultSteamAvatar =
    'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg';

  constructor(public readonly authService: AuthService) {}
}
