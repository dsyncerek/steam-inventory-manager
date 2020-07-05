import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginButtonComponent {
  public steamLoginButtonSrc = 'https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png';
}
