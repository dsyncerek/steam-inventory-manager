import { ApiModelProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Inventory } from '../../inventory/entity/inventory.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Bot {
  @PrimaryColumn()
  @ApiModelProperty()
  steamId: string;

  @Column({ default: '' })
  @ApiModelProperty()
  name: string;

  @Column({ default: '' })
  @ApiModelProperty()
  login: string;

  @Column({ default: '' })
  @ApiModelProperty()
  tradeLink: string;

  @Column({ default: false })
  @ApiModelProperty()
  is2FA: boolean;

  @Column({ default: false })
  @ApiModelProperty()
  isOnline: boolean;

  @OneToMany(() => Inventory, inv => inv.bot, { eager: true })
  @ApiModelProperty({ type: Inventory, isArray: true })
  inventories: Inventory[];

  @Column()
  @ApiModelProperty()
  ownerSteamId: string;

  @ManyToOne(() => User, user => user.bots, { nullable: false, onDelete: 'CASCADE' })
  owner: User;

  constructor(partial: Partial<Bot> = {}) {
    Object.assign(this, partial);
  }

  @BeforeInsert()
  setOwner(): void {
    this.owner = new User({ steamId: this.ownerSteamId });
  }
}
