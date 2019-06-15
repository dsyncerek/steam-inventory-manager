import { AfterLoad, Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Inventory from './Inventory.entity';

@Entity()
class Bot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index({ unique: true })
  steamId: string;

  @Column({ default: "" })
  name: string;

  @Column({ default: "" })
  login: string;

  @Column({ default: "" })
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
