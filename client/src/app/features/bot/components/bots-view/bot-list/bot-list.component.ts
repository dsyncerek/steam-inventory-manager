import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bot } from '@bot/models/bot';

@Component({
  selector: 'app-bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotListComponent {
  @Input()
  public bots: Bot[];

  @Input()
  public loading = false;

  public trackByFn(index: number, item: Bot): string {
    return item.steamId;
  }
}
