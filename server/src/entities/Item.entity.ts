import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import InventoryItem from './InventoryItem.entity';

@Entity()
class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index({ unique: true })
  classId: string;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  appId: number;

  @Column()
  contextId: number;

  @Column()
  icon: string;

  @Column({ default: 0 })
  price: number;

  @OneToMany(() => InventoryItem, inventoryItem => inventoryItem.item)
  inventoryItems: InventoryItem[];

  constructor(partial: Partial<Item> = {}) {
    Object.assign(this, partial);
  }
}

export default Item;
