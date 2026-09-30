'use client';

import StatusBadge from './StatusBadge';

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  fee: number;
  status: 'completed' | 'pending' | 'refunded';
  method: string;
  date: string;
  description: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onSelect: (transaction: Transaction) => void;
  onSettle: (id: string) => Promise<void>;
}

export default function TransactionTable({
  transactions,
  onSelect,
  onSettle,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⌕</div>
        <h3>No transactions found</h3>
        <p>Try another status filter.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Customer</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <button className="link-button" onClick={() => onSelect(transaction)}>
                  {transaction.id}
                </button>
                <span className="muted">{transaction.date}</span>
              </td>
              <td>{transaction.customer}</td>
              <td>{transaction.method}</td>
              <td className="amount">৳{transaction.amount.toLocaleString()}</td>
              <td>
                <StatusBadge status={transaction.status} />
              </td>
              <td className="actions">
                <button
                  className="view-button"
                  onClick={() => onSelect(transaction)}
                >
                  View
                </button>
                {transaction.status === 'pending' && (
                  <button
                    className="settle-button"
                    onClick={() => onSettle(transaction.id)}
                  >
                    Settle
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
