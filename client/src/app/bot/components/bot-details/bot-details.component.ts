import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bot } from '../../models/bot';

@Component({
  selector: 'app-bot-details',
  templateUrl: './bot-details.component.html',
  styleUrls: ['./bot-details.component.scss'],
})
export class BotDetailsComponent {
  @Input() bot: Bot;

  @Output() botDelete = new EventEmitter<string>();

  get steamProfileUrl(): string {
    return `http://steamcommunity.com/profiles/${this.bot.steamId}`;
  }
}
