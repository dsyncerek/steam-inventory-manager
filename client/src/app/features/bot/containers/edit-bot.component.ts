import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/core.state';
import { GetBot, UpdateBot } from '../bot.actions';
import { selectBot } from '../bot.selectors';
import { Bot } from '../models/bot';
import { UpdateBotDto } from '../models/update-bot';

@Component({
  selector: 'app-edit-bot',
  template: `
    <app-edit-bot-form [bot]="bot$ | async" (editBot)="onEditBot($event)"></app-edit-bot-form>
  `,
})
export class EditBotComponent implements OnInit {
  bot$: Observable<Bot>;

  constructor(private readonly store: Store<AppState>, private readonly activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const steamId = this.activeRoute.snapshot.params.steamId;
    this.bot$ = this.store.select(selectBot, { steamId });
    this.store.dispatch(new GetBot({ steamId }));
  }

  onEditBot(bot: UpdateBotDto): void {
    this.store.dispatch(new UpdateBot({ bot }));
  }
}
