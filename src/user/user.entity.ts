import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDto } from './dto/user.dto';
import { TransactionEntity } from '../transaction/transaction.entity';
import { PortfolioEntity } from '../portfolio/portfolio.entity';

@Entity()
export class UserEntity extends BaseEntity implements UserDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 320,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  pwdHash: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @OneToMany((type) => TransactionEntity, (entity) => entity.user)
  transaction: TransactionEntity[];

  @OneToMany((type) => PortfolioEntity, (entity) => entity.user)
  portfolio: PortfolioEntity[];
}
