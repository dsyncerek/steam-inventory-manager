import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Inventory } from '../../inventory/entity/inventory.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Bot {
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

  @OneToMany(() => Inventory, inv => inv.bot, { cascade: true, eager: true })
  inventories: Inventory[];

  @ManyToOne(() => User, user => user.bots, { cascade: true, nullable: false, onDelete: 'CASCADE' })
  owner: User;

  ownerSteamId: string;

  @BeforeInsert()
  setOwner() {
    this.owner = new User({ steamId: this.ownerSteamId });
  }

  constructor(partial: Partial<Bot> = {}) {
    Object.assign(this, partial);
  }
}
