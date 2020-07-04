import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '@item/models/item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent {
  @Input()
  public quantity: number;

  @Input()
  public item: Item;

  public get steamMarketUrl(): string {
    return `http://steamcommunity.com/market/listings/${this.item.appId}/${this.item.name}`;
  }

  public get steamIconUrl(): string {
    return `https://steamcommunity-a.akamaihd.net/economy/image/${this.item.icon}`;
  }
}
