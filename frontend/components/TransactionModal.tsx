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

interface TransactionModalProps {
  transaction: Transaction;
  onClose: () => void;
  onSettle: (id: string) => Promise<void>;
}

export default function TransactionModal({
  transaction,
  onClose,
  onSettle,
}: TransactionModalProps) {
  const net = transaction.amount - transaction.fee;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Transaction details</p>
            <h2>{transaction.id}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-status">
          <StatusBadge status={transaction.status} />
          <span>{transaction.date}</span>
        </div>

        <div className="detail-grid">
          <div>
            <span>Customer</span>
            <strong>{transaction.customer}</strong>
          </div>
          <div>
            <span>Payment method</span>
            <strong>{transaction.method}</strong>
          </div>
          <div>
            <span>Amount</span>
            <strong>৳{transaction.amount.toLocaleString()}</strong>
          </div>
          <div>
            <span>Fee</span>
            <strong>৳{transaction.fee.toLocaleString()}</strong>
          </div>
          <div>
            <span>Expected net</span>
            <strong>৳{net.toLocaleString()}</strong>
          </div>
          <div>
            <span>Description</span>
            <strong>{transaction.description}</strong>
          </div>
        </div>

        <div className="modal-actions">
          {transaction.status === 'pending' && (
            <button
              className="primary-button"
              onClick={() => onSettle(transaction.id)}
            >
              Mark as settled
            </button>
          )}
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
