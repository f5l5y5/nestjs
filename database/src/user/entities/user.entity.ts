import {
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';

import { Tags } from './tags.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  desc: string;

  @Generated('uuid')
  uuid: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @OneToMany(() => Tags, (tags) => tags.user)
  tags: Tags[];
}
