import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Inventory } from '../../inventory/entity/inventory.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Bot {
  @PrimaryColumn()
  @ApiProperty()
  steamId: string;

  @Column({ default: '' })
  @ApiProperty()
  name: string;

  @Column({ default: '' })
  @ApiProperty()
  login: string;

  @Column({ default: '' })
  @ApiProperty()
  tradeLink: string;

  @Column({ default: false })
  @ApiProperty()
  is2FA: boolean;

  @Column({ default: false })
  @ApiProperty()
  isOnline: boolean;

  @OneToMany(
    () => Inventory,
    inv => inv.bot,
    { eager: true },
  )
  @ApiProperty({ type: Inventory, isArray: true })
  inventories: Inventory[];

  @Column()
  @ApiProperty()
  ownerSteamId: string;

  @ManyToOne(
    () => User,
    user => user.bots,
    { nullable: false, onDelete: 'CASCADE' },
  )
  owner: User;

  constructor(partial: Partial<Bot> = {}) {
    Object.assign(this, partial);
  }

  @BeforeInsert()
  setOwner(): void {
    this.owner = new User({ steamId: this.ownerSteamId });
  }
}
