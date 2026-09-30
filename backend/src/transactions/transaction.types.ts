export type TransactionStatus = 'completed' | 'pending' | 'refunded';

export interface Transaction {
  id: string;
  customer: string;
  amount: number;
  fee: number;
  status: TransactionStatus;
  method: string;
  date: string;
  description: string;
}
