import { TransactionEntity } from '../transaction/transaction.entity';

export const transactionsValues = (transactions: TransactionEntity[]) => {
  const sumTransactionsAmount = transactions
    .map((transaction) => transaction.amount)
    .reduce((acc: number, curr: number) => acc + curr, 0);
  const sumTransactionsPrice = transactions
    .map((transaction) => transaction.totalPrice)
    .reduce((acc: number, curr: number) => acc + curr, 0);

  return {
    sumTransactionsAmount,
    sumTransactionsPrice,
  };
};
