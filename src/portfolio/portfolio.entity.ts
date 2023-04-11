import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity()
export class PortfolioEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 36,
  })
  coinId: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  coinName: string;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 6,
  })
  overallAmount: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 6,
  })
  overallPrice: number;

  //tutaj jeszcze userId
  @ManyToOne((type) => UserEntity, (entity) => entity.portfolio)
  @JoinColumn()
  user: UserEntity;
}
