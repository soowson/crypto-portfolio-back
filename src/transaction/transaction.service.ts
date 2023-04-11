import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { AddTransactionDto } from './dto/addTransaction.dto';
import { TransactionEntity } from './transaction.entity';
import {
  AddTransactionResponse,
  DeleteTransactionResponse,
  EditTransactionResponse,
  GetTransactionListResponse,
} from '../types/transaction/transaction';
import { EditTransactionDto } from './dto/editTransaction.dto';
import { UserService } from '../user/user.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import { transactionsValues } from '../utils/functions-helpers';
import { Equal } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => PortfolioService))
    private portfolioService: PortfolioService,
  ) {}

  async transactionCoinListForUser(
    user: UserEntity,
    coinId: string,
  ): Promise<TransactionEntity[]> {
    const transactions = await TransactionEntity.findBy({
      user: Equal(user.id),
      coinId,
    });

    return transactions;
  }

  async transactionListForUser(
    user: UserEntity,
  ): Promise<GetTransactionListResponse> {
    const transactions = await TransactionEntity.find({
      where: {
        user: Equal(user.id),
      },
    });

    if (transactions.length === 0) {
      return {
        message: 'NO TRANSACTIONS',
      };
    }

    return transactions;
  }

  async addTransaction(
    transaction: AddTransactionDto,
    user: UserEntity,
  ): Promise<AddTransactionResponse> {
    const {
      transactionType,
      coinId,
      coinName,
      amount,
      price,
      totalPrice,
      date,
      time,
      notes,
    } = transaction;

    const newTransaction = new TransactionEntity();
    newTransaction.transactionType = transactionType;
    newTransaction.coinId = coinId;
    newTransaction.coinName = coinName;
    newTransaction.amount = amount;
    newTransaction.price = price;
    newTransaction.totalPrice = totalPrice;
    newTransaction.date = date;
    newTransaction.time = time;
    newTransaction.notes = notes;

    await newTransaction.save();

    newTransaction.user = user;
    await newTransaction.save();

    //portfolio update
    const transactions = await this.transactionCoinListForUser(user, coinId);
    if (transactions.length > 0) {
      const sumTransactionsValues = transactionsValues(transactions);
      const coinFromPortfolio = await this.portfolioService.getOneCoinForUser(
        coinId,
        user,
      );
      if (!coinFromPortfolio) {
        await this.portfolioService.addCoin(
          coinId,
          coinName,
          sumTransactionsValues.sumTransactionsAmount,
          sumTransactionsValues.sumTransactionsPrice,
          user,
        );
      } else {
        await this.portfolioService.updateCoin(
          coinFromPortfolio.id,
          sumTransactionsValues.sumTransactionsAmount,
          sumTransactionsValues.sumTransactionsPrice,
        );
      }
    }

    return {
      isSuccess: true,
      id: newTransaction.id,
    };
  }

  async editTransaction(
    transaction: EditTransactionDto,
    user: UserEntity,
  ): Promise<EditTransactionResponse> {
    const {
      id,
      transactionType,
      coinId,
      coinName,
      amount,
      price,
      totalPrice,
      date,
      time,
      notes,
    } = transaction;

    const transactionToEdit = await TransactionEntity.findOne({
      where: {
        id: id,
      },
    });

    if (!transactionToEdit) {
      return {
        isSuccess: false,
      };
    }

    transactionToEdit.transactionType = transactionType;
    transactionToEdit.coinId = coinId;
    transactionToEdit.coinName = coinName;
    transactionToEdit.amount = amount;
    transactionToEdit.price = price;
    transactionToEdit.totalPrice = totalPrice;
    transactionToEdit.date = date;
    transactionToEdit.time = time;
    transactionToEdit.notes = notes;

    await transactionToEdit.save();

    //portfolio update
    const transactions = await this.transactionCoinListForUser(user, coinId);
    console.log(transactions);
    if (transactions.length > 0) {
      const sumTransactionsValues = transactionsValues(transactions);
      const coinFromPortfolio = await this.portfolioService.getOneCoinForUser(
        coinId,
        user,
      );
      if (coinFromPortfolio) {
        await this.portfolioService.updateCoin(
          coinFromPortfolio.id,
          sumTransactionsValues.sumTransactionsAmount,
          sumTransactionsValues.sumTransactionsPrice,
        );
      }
    }

    return {
      isSuccess: true,
      id: transactionToEdit.id,
    };
  }

  async deleteTransaction(
    user: UserEntity,
    id: string,
    coinId: string,
  ): Promise<DeleteTransactionResponse> {
    const transactionToDelete = await TransactionEntity.findOne({
      where: {
        id: id,
      },
    });
    if (!transactionToDelete) {
      return {
        isSuccess: false,
      };
    }
    await transactionToDelete.remove();

    //portfolio update
    const transactions = await this.transactionCoinListForUser(user, coinId);
    const coinFromPortfolio = await this.portfolioService.getOneCoinForUser(
      coinId,
      user,
    );

    if (transactions.length > 0) {
      const sumTransactionsValues = transactionsValues(transactions);
      await this.portfolioService.updateCoin(
        coinFromPortfolio.id,
        sumTransactionsValues.sumTransactionsAmount,
        sumTransactionsValues.sumTransactionsPrice,
      );
    } else if (transactions.length === 0) {
      await this.portfolioService.deleteCoin(coinFromPortfolio.id, user);
    }

    return {
      isSuccess: true,
      id: id,
    };
  }
}
