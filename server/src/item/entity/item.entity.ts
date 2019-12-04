import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  @ApiProperty()
  classId: string;

  @Column()
  @Index({ unique: true })
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  appId: number;

  @Column()
  @ApiProperty()
  contextId: number;

  @Column()
  @ApiProperty()
  icon: string;

  @Column({ default: 0 })
  @ApiProperty()
  price: number;

  constructor(partial: Partial<Item> = {}) {
    Object.assign(this, partial);
  }
}
