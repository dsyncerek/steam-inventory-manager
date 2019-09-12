import { Component, Input } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {
  @Input() quantity: number;
  @Input() item: Item;

  get steamMarketUrl(): string {
    return `http://steamcommunity.com/market/listings/${this.item.appId}/${this.item.name}`;
  }

  get steamIconUrl(): string {
    return `https://steamcommunity-a.akamaihd.net/economy/image/${this.item.icon}`;
  }
}
