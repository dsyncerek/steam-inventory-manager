import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolesEnum } from '../../access-control/enums/roles.enum';
import { Bot } from '../../bot/entity/bot.entity';

@Entity()
export class User {
  @PrimaryColumn()
  @ApiProperty()
  steamId: string;

  @OneToMany(
    () => Bot,
    bot => bot.owner,
  )
  bots: Bot[];

  @Column('simple-array')
  @ApiProperty()
  roles: RolesEnum[] = [];

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial);
  }
}
