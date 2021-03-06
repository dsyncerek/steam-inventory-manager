import { ApiHideProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AfterLoad, BeforeInsert, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { Bot } from '../../bot/entity/bot.entity';
import { InventoryItem } from './inventory-item.entity';

@Entity()
@Unique(['appId', 'contextId', 'botSteamId'])
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  appId: number;

  @Column()
  contextId: number;

  @Column()
  botSteamId: string;

  @ManyToOne(() => Bot, bot => bot.inventories, { nullable: false, onDelete: 'CASCADE' })
  @ApiHideProperty()
  bot: Bot;

  @OneToMany(() => InventoryItem, item => item.inventory, { cascade: true, eager: true })
  @Expose({ groups: ['inventory'] })
  items: InventoryItem[];

  count: number;
  worth: number;

  constructor(partial: Partial<Inventory> = {}) {
    Object.assign(this, partial);
  }

  @AfterLoad()
  setCountAndWorth(): void {
    this.count = this.items.map(invItem => invItem.quantity).reduce((a, b) => a + b, 0);
    this.worth = this.items.map(invItem => invItem.quantity * invItem.item.price).reduce((a, b) => a + b, 0);
  }

  @AfterLoad()
  sortItemsByPrice(): void {
    this.items.sort((a, b) => b.item.price - a.item.price);
  }

  @BeforeInsert()
  setBot(): void {
    this.bot = new Bot({ steamId: this.botSteamId });
  }
}
