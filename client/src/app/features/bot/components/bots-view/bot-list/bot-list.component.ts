import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { openAddBotDialog } from '@bot/bot.actions';
import { Bot } from '@bot/models/bot';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';

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

  constructor(private readonly store: Store<AppState>) {}

  public addBot(): void {
    this.store.dispatch(openAddBotDialog());
  }

  public trackByFn(index: number, item: Bot): string {
    return item.steamId;
  }
}
