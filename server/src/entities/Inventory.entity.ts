import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Bot from './Bot.entity';
import InventoryItem from './InventoryItem.entity';

@Entity()
class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  count: number;

  @Column({ default: 0 })
  worth: number;

  @OneToOne(() => Bot, bot => bot.inventory, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  bot: Bot;

  @OneToMany(() => InventoryItem, item => item.inventory, { cascade: true })
  items: InventoryItem[];

  constructor(partial: Partial<Inventory> = {}) {
    Object.assign(this, partial);
  }
}

export default Inventory;
