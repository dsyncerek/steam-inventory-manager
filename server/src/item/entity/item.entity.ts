import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryColumn()
  @ApiModelProperty()
  classId: string;

  @Column()
  @Index({ unique: true })
  @ApiModelProperty()
  name: string;

  @Column()
  @ApiModelProperty()
  appId: number;

  @Column()
  @ApiModelProperty()
  contextId: number;

  @Column()
  @ApiModelProperty()
  icon: string;

  @Column({ default: 0 })
  @ApiModelProperty()
  price: number;

  constructor(partial: Partial<Item> = {}) {
    Object.assign(this, partial);
  }
}
