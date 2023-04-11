import { TransactionEntity } from '../../transaction/transaction.entity';

export type AddTransactionResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export type EditTransactionResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export type DeleteTransactionResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export type GetTransactionListResponse =
  | TransactionEntity[]
  | {
      message: 'NO TRANSACTIONS';
    };

export interface GetTransactionReq {
  id: string;
  transactionType: string;
  coinId: string;
  coinName: string;
  amount: number;
  price: number;
  totalPrice: number;
  date: string;
  time: string;
  notes: string;
}

export type AddTransactionReq = Omit<GetTransactionReq, 'id' | 'totalPrice'>;

export interface EditTransactionReq {
  transactionType: string | undefined;
  coinId: string | undefined;
  coinName: string | undefined;
  amount: number | undefined;
  price: number | undefined;
  date: string;
  time: string;
  notes: string | undefined;
}
