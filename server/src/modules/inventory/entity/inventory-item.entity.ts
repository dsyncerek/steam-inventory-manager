import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../../item/entity/item.entity';
import { Inventory } from './inventory.entity';

@Entity()
export class InventoryItem {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Inventory, inv => inv.items, { nullable: false, onDelete: 'CASCADE' })
  @ApiHideProperty()
  inventory: Inventory;

  @ManyToOne(() => Item, { eager: true, cascade: true, nullable: false, onDelete: 'CASCADE' })
  item: Item;

  constructor(partial: Partial<InventoryItem> = {}) {
    Object.assign(this, partial);
  }
}
