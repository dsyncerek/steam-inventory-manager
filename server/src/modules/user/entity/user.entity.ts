import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolesEnum } from '../../access-control/enums/roles.enum';
import { Bot } from '../../bot/entity/bot.entity';

@Entity()
export class User {
  @PrimaryColumn()
  steamId: string;

  @OneToMany(
    () => Bot,
    bot => bot.owner,
  )
  @ApiHideProperty()
  bots: Bot[];

  @Column('simple-array')
  roles: RolesEnum[] = [];

  @Exclude()
  @ApiHideProperty()
  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial);
  }
}
