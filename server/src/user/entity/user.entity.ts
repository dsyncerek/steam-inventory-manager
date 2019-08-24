import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PermissionsEnum } from '../../access-control/enums/permissions.enum';
import { RolesEnum } from '../../access-control/enums/roles.enum';
import { Bot } from '../../bot/entity/bot.entity';

@Entity()
export class User {
  @PrimaryColumn()
  steamId: string;

  @OneToMany(() => Bot, bot => bot.owner)
  bots: Bot[];

  @Column('simple-array')
  roles: RolesEnum[];

  @Column('simple-array')
  permissions: PermissionsEnum[];

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<User> = {}) {
    Object.assign(this, partial);
  }

  @BeforeInsert()
  setPermissions(): void {
    if (!this.permissions) {
      this.permissions = [];
    }
  }

  hasRole(...roles: RolesEnum[]): boolean {
    return this.roles.filter(value => roles.includes(value)).length !== 0;
  }

  hasPermission(...permissions: PermissionsEnum[]): boolean {
    // todo
    return true;
  }
}
