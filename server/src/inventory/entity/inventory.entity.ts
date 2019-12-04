import { ApiProperty } from '@nestjs/swagger';
import { AfterLoad, BeforeInsert, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { Bot } from '../../bot/entity/bot.entity';
import { InventoryItem } from './inventory-item.entity';

@Entity()
@Unique(['appId', 'contextId', 'botSteamId'])
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  appId: number;

  @Column()
  @ApiProperty()
  contextId: number;

  @Column()
  @ApiProperty()
  botSteamId: string;

  @ManyToOne(
    () => Bot,
    bot => bot.inventories,
    { nullable: false, onDelete: 'CASCADE' },
  )
  bot: Bot;

  @OneToMany(
    () => InventoryItem,
    item => item.inventory,
    { cascade: true, eager: true },
  )
  @ApiProperty({ type: InventoryItem, isArray: true })
  items: InventoryItem[];

  @ApiProperty()
  count: number;

  @ApiProperty()
  worth: number;

  constructor(partial: Partial<Inventory> = {}) {
    Object.assign(this, partial);
  }

  @AfterLoad()
  setCountAndWorth(): void {
    this.count = this.items.map(invItem => invItem.quantity).reduce((a, b) => a + b, 0);
    this.worth = this.items.map(invItem => invItem.quantity * invItem.item.price).reduce((a, b) => a + b, 0);
  }

  @BeforeInsert()
  setBot(): void {
    this.bot = new Bot({ steamId: this.botSteamId });
  }
}
