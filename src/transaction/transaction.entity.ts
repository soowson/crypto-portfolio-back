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
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 4,
  })
  transactionType: string;

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
  amount: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 6,
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 6,
  })
  totalPrice: number;

  @Column({
    type: 'time',
  })
  time: string;

  @Column({
    type: 'date',
  })
  date: string;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  notes: string;

  @ManyToOne((type) => UserEntity, (entity) => entity.transaction)
  @JoinColumn()
  user: UserEntity;
}
