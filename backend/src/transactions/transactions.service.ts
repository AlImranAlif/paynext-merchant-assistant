import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './transaction.types';

@Injectable()
export class TransactionsService {
  private readonly transactions: Transaction[] = [
    {
      id: 'TXN-1001',
      customer: 'Rahim Ahmed',
      amount: 2500,
      fee: 50,
      status: 'completed',
      method: 'Card',
      date: '2026-09-30',
      description: 'Retail purchase',
    },
    {
      id: 'TXN-1002',
      customer: 'Karim Store',
      amount: 1800,
      fee: 36,
      status: 'pending',
      method: 'Mobile Banking',
      date: '2026-09-30',
      description: 'Wholesale order',
    },
    {
      id: 'TXN-1003',
      customer: 'Nusrat Fashion',
      amount: 4500,
      fee: 90,
      status: 'refunded',
      method: 'Card',
      date: '2026-09-30',
      description: 'Returned order',
    },
    {
      id: 'TXN-1004',
      customer: 'Dhaka Gadgets',
      amount: 7200,
      fee: 144,
      status: 'completed',
      method: 'Bank Transfer',
      date: '2026-09-30',
      description: 'Electronics order',
    },
    {
      id: 'TXN-1005',
      customer: 'Maya Boutique',
      amount: 3200,
      fee: 64,
      status: 'pending',
      method: 'Mobile Banking',
      date: '2026-09-30',
      description: 'Fashion order',
    },
    {
      id: 'TXN-1006',
      customer: 'Green Basket',
      amount: 1950,
      fee: 39,
      status: 'completed',
      method: 'Card',
      date: '2026-09-30',
      description: 'Grocery order',
    }
  ];

  findAll(status?: string): Transaction[] {
    if (!status || status === 'all') {
      return this.transactions;
    }

    return this.transactions.filter((transaction) => transaction.status === status);
  }

  findOne(id: string): Transaction {
    const transaction = this.transactions.find((item) => item.id === id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  getSummary() {
    const completed = this.transactions.filter((t) => t.status === 'completed');
    const pending = this.transactions.filter((t) => t.status === 'pending');
    const refunded = this.transactions.filter((t) => t.status === 'refunded');

    const grossSales = completed.reduce((sum, t) => sum + t.amount, 0);
    const refunds = refunded.reduce((sum, t) => sum + t.amount, 0);
    const fees = completed.reduce((sum, t) => sum + t.fee, 0);
    const pendingAmount = pending.reduce((sum, t) => sum + t.amount, 0);

    return {
      grossSales,
      refunds,
      fees,
      pendingAmount,
      netSettlement: grossSales - refunds - fees,
      completedCount: completed.length,
      pendingCount: pending.length,
      refundedCount: refunded.length,
    };
  }

  settle(id: string): Transaction {
    const transaction = this.findOne(id);

    if (transaction.status !== 'pending') {
      return transaction;
    }

    transaction.status = 'completed';

    return transaction;
  }
}
