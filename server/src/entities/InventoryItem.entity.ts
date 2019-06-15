import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Inventory from './Inventory.entity';
import Item from "./Item.entity";

@Entity()
class InventoryItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Inventory, inv => inv.items)
  inventory: Inventory;

  @ManyToOne(() => Item, item => item.inventoryItems, { eager: true, cascade: true })
  item: Item;

  constructor(partial: Partial<InventoryItem> = {}) {
    Object.assign(this, partial);
  }
}

export default InventoryItem;
