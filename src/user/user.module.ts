import { forwardRef, Module } from '@nestjs/common';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { TransactionModule } from '../transaction/transaction.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => PortfolioModule),
    forwardRef(() => TransactionModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
