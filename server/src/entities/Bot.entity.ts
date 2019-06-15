import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToOne(() => Inventory, inv => inv.bot)
  inventory: Inventory;
}

export default Bot;
