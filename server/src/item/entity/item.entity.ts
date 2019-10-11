import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  classId: string;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  appId: number;

  @Column()
  contextId: number;

  @Column()
  icon: string;

  @Column({ default: 0 })
  price?: number;

  constructor(partial: Partial<Item> = {}) {
    Object.assign(this, partial);
  }
}
