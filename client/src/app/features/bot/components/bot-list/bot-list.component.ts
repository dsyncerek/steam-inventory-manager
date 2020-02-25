import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bot } from '../../models/bot';

@Component({
  selector: 'app-bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.scss'],
})
export class BotListComponent {
  @Input() bots: Bot[];
  @Input() loading: boolean = false;
  @Output() botAdd = new EventEmitter<string>();
  @Output() botEdit = new EventEmitter<string>();
  @Output() botDelete = new EventEmitter<string>();
}
