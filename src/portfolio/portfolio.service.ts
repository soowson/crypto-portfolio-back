import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PortfolioEntity } from './portfolio.entity';
import { TransactionService } from '../transaction/transaction.service';
import { UserEntity } from '../user/user.entity';
import { GetPortfolioListResponse } from '../types/portfolio/portfolio';
import { Equal } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService,
  ) {}

  async addCoin(
    coinId: string,
    coinName: string,
    overallAmount: number,
    overallPrice: number,
    user: UserEntity,
  ) {
    const newCoin = new PortfolioEntity();
    newCoin.coinId = coinId;
    newCoin.coinName = coinName;
    newCoin.overallAmount = overallAmount;
    newCoin.overallPrice = overallPrice;

    await newCoin.save();

    newCoin.user = user;
    await newCoin.save();
  }

  async getOneCoinForUser(coinId, user): Promise<PortfolioEntity> {
    const coinFromPortfolio = await PortfolioEntity.findOne({
      where: {
        coinId,
        user: Equal(user.id),
      },
    });

    return coinFromPortfolio;
  }

  async updateCoin(id: string, overallAmount: number, overallPrice: number) {
    await PortfolioEntity.update(id, {
      overallAmount: overallAmount,
      overallPrice: overallPrice,
    });
  }

  async portfolioListForUser(
    user: UserEntity,
  ): Promise<GetPortfolioListResponse> {
    const portfolio = await PortfolioEntity.find({
      where: {
        user: Equal(user.id),
      },
    });

    if (portfolio.length === 0) {
      return {
        message: 'TO CREATE YOUR PORTFOLIO ADD TRANSACTION!',
      };
    }

    return portfolio;
  }

  async deleteCoin(id: string, user: UserEntity) {
    const coinFromPortfolio = await PortfolioEntity.findOneBy({
      id,
      user: Equal(user.id),
    });
    await coinFromPortfolio.remove();
  }
}
