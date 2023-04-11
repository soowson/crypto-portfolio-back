import { forwardRef, Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { TransactionModule } from '../transaction/transaction.module';
import { UserService } from '../user/user.service';
import { PortfolioController } from './portfolio.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => TransactionModule), forwardRef(() => UserModule)],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
