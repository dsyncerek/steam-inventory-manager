import { AfterLoad, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import Inventory from './Inventory.entity';

@Entity()
class Bot {
  @PrimaryColumn()
  steamId: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  login: string;

  @Column({ default: '' })
  tradeLink: string;

  @Column({ default: false })
  is2FA: boolean;

  @Column({ default: false })
  isOnline: boolean;

  @OneToOne(() => Inventory, inv => inv.bot, { cascade: true, eager: true })
  inventory: Inventory;

  constructor(partial: Partial<Bot> = {}) {
    Object.assign(this, partial);
  }

  @AfterLoad()
  setInventory() {
    if (this.inventory === null)
      this.inventory = new Inventory({
        items: [],
        worth: 0,
        count: 0,
      });
  }
}

export default Bot;
