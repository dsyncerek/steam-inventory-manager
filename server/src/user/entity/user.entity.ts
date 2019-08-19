import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Bot } from '../../bot/entity/bot.entity';
import { PermissionsEnum } from '../../common/enums/permissions.enum';
import { RolesEnum } from '../../common/enums/roles.enum';

@Entity()
export class User {
  @PrimaryColumn()
  steamId: string;

  @OneToMany(() => Bot, bot => bot.owner)
  bots: Bot[];

  @Column('simple-array')
  roles: RolesEnum[];

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial);
  }

  hasRole(...roles: RolesEnum[]): boolean {
    return this.roles.filter(value => roles.includes(value)).length !== 0;
  }

  hasPermission(...permissions: PermissionsEnum[]): boolean {
    // todo
    return true;
  }
}
