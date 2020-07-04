import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { deleteBot, openEditBotDialog } from '@bot/bot.actions';
import { Bot } from '@bot/models/bot';
import { AppState } from '@core/core.state';
import { Store } from '@ngrx/store';
import { DialogService } from '../../../../../core/dialog.service';

@Component({
  selector: 'app-bot-details',
  templateUrl: './bot-details.component.html',
  styleUrls: ['./bot-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotDetailsComponent {
  @Input()
  public bot: Bot;

  @Input()
  public loading = false;

  public get steamProfileUrl(): string {
    return `http://steamcommunity.com/profiles/${this.bot.steamId}`;
  }

  constructor(
    private readonly store: Store<AppState>,
    private readonly activeRoute: ActivatedRoute,
    private readonly dialogService: DialogService,
  ) {}

  public editBot(): void {
    this.store.dispatch(openEditBotDialog({ steamId: this.bot.steamId }));
  }

  public deleteBot(): void {
    const message = `Do you really want to delete bot ${this.bot.steamId}?`;

    this.dialogService.openConfirmationDialog(message).subscribe(() => {
      this.store.dispatch(deleteBot({ steamId: this.bot.steamId }));
    });
  }
}
