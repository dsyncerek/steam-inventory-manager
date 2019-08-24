import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PermissionsEnum } from '../../access-control/enums/permissions.enum';
import { RolesEnum } from '../../access-control/enums/roles.enum';
import { Bot } from '../../bot/entity/bot.entity';
import { arrayIntersectionAny } from '../../common/utils/array.util';

@Entity()
export class User {
  @PrimaryColumn()
  steamId: string;

  @OneToMany(() => Bot, bot => bot.owner)
  bots: Bot[];

  @Column('simple-array')
  roles: RolesEnum[] = [];

  @Column('simple-array')
  permissions: PermissionsEnum[] = [];

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial);
  }

  hasRole(...roles: RolesEnum[]): boolean {
    return arrayIntersectionAny(this.roles, roles);
  }

  hasPermission(...permissions: PermissionsEnum[]): boolean {
    return arrayIntersectionAny(this.permissions, permissions);
  }
}
