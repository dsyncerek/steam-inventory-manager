import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import InventoryItem from './InventoryItem.entity';

@Entity()
class Item {
  @PrimaryColumn()
  classId: string;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  appId: number;

  @Column()
  contextId: number;

  @Column({ default: '' })
  icon: string;

  @Column({ default: 0 })
  price: number;

  @OneToMany(() => InventoryItem, invItem => invItem.item)
  invItems: InventoryItem[];

  constructor(partial: Partial<Item> = {}) {
    Object.assign(this, partial);
  }
}

export default Item;
