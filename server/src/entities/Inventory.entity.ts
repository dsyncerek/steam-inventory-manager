import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Bot from './Bot.entity';
import InventoryItem from './InventoryItem.entity';

@Entity()
class Inventory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 0 })
  count: number;

  @Column({ default: 0 })
  worth: number;

  @OneToOne(() => Bot, bot => bot.inventory)
  @JoinColumn()
  bot: Bot;

  @OneToMany(() => InventoryItem, item => item.inventory, { eager: true, cascade: true })
  items: InventoryItem[];
}

export default Inventory;
