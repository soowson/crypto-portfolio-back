import { forwardRef, Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => PortfolioModule), forwardRef(() => UserModule)],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
