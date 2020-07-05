import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Bot } from '../../models/bot';

export interface BotsSummary {
  botCount: number;
  inventoriesCount: number;
  itemsCount: number;
  itemsWorth: number;
  games: number[];
}

@Component({
  selector: 'app-bots-summary',
  templateUrl: './bots-summary.component.html',
  styleUrls: ['./bots-summary.component.scss'],
})
export class BotsSummaryComponent implements OnChanges {
  @Input()
  public bots: Bot[] = [];

  public summary: BotsSummary;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.bots) {
      this.getSummary(this.bots);
    }
  }

  private getSummary(bots: Bot[]): void {
    this.summary = {
      botCount: bots.length,
      inventoriesCount: bots.map(bot => bot.inventories.length).reduce(sum, 0),
      itemsCount: bots
        .map(bot => bot.inventories.map(inv => inv.count))
        .flat()
        .reduce(sum, 0),
      itemsWorth: bots
        .map(bot => bot.inventories.map(inv => inv.worth))
        .flat()
        .reduce(sum, 0),
      games: bots
        .map(bot => bot.inventories.map(inv => inv.appId))
        .flat()
        .reduce(unique, []),
    };
  }
}

function sum(a: number, b: number): number {
  return a + b;
}

function unique<T>(array: T[], item: T): T[] {
  if (array.includes(item)) {
    return array;
  } else {
    return [...array, item];
  }
}
