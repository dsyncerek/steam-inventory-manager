import { ApiHideProperty } from '@nestjs/swagger';
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

  @OneToMany(() => Inventory, inv => inv.bot, { eager: true })
  inventories: Inventory[];

  @Column()
  ownerSteamId: string;

  @ManyToOne(() => User, user => user.bots, { nullable: false, onDelete: 'CASCADE' })
  @ApiHideProperty()
  owner: User;

  constructor(partial: Partial<Bot> = {}) {
    Object.assign(this, partial);
  }

  @BeforeInsert()
  setOwner(): void {
    this.owner = new User({ steamId: this.ownerSteamId });
  }
}
