import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bots-dashboard',
  templateUrl: './bots-dashboard.component.html',
  styleUrls: ['./bots-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotsDashboardComponent {}
