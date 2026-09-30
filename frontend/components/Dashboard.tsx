'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SummaryCard from './SummaryCard';
import TransactionModal from './TransactionModal';
import TransactionTable from './TransactionTable';
import { getSummary, getTransactions, settleTransaction } from '../lib/api';

type Filter = 'all' | 'completed' | 'pending' | 'refunded';

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

interface Summary {
  grossSales: number;
  refunds: number;
  fees: number;
  pendingAmount: number;
  netSettlement: number;
  completedCount: number;
  pendingCount: number;
  refundedCount: number;
}

const initialSummary: Summary = {
  grossSales: 0,
  refunds: 0,
  fees: 0,
  pendingAmount: 0,
  netSettlement: 0,
  completedCount: 0,
  pendingCount: 0,
  refundedCount: 0,
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>(initialSummary);
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      setError('');
      const [transactionData, summaryData] = await Promise.all([
        getTransactions('all'),
        getSummary(),
      ]);

      setTransactions(transactionData);
      setSummary(summaryData);
    } catch {
      setError(
        'Could not connect to the API. Start the NestJS backend on port 3000.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((item) => item.status === filter);
  }, [filter, transactions]);

  async function handleSettle(id: string) {
    try {
      setActionLoading(true);
      setError('');
      const updated = await settleTransaction(id);

      setTransactions((current) =>
        current.map((item) => (item.id === id ? updated : item))
      );

      setSummary(await getSummary());
      setSelected(updated);
    } catch {
      setError('The transaction could not be settled.');
    } finally {
      setActionLoading(false);
    }
  }

  function handleFilter(nextFilter: Filter) {
    setFilter(nextFilter);
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <Header />

        <section className="welcome-row">
          <div>
            <h2>Good morning, Alif</h2>
            <p>Here&apos;s your payment and settlement position for today.</p>
          </div>
          <div className="date-chip">30 Sep 2026</div>
        </section>

        {error && <div className="error-banner">{error}</div>}

        <section className="summary-grid">
          <SummaryCard
            label="Gross sales"
            value={`৳${summary.grossSales.toLocaleString()}`}
            hint={`${summary.completedCount} completed payments`}
          />
          <SummaryCard
            label="Pending"
            value={`৳${summary.pendingAmount.toLocaleString()}`}
            hint={`${summary.pendingCount} awaiting settlement`}
          />
          <SummaryCard
            label="Refunds"
            value={`৳${summary.refunds.toLocaleString()}`}
            hint={`${summary.refundedCount} refunded payment`}
          />
          <SummaryCard
            label="Net settlement"
            value={`৳${summary.netSettlement.toLocaleString()}`}
            hint={`After ৳${summary.fees.toLocaleString()} in fees`}
          />
        </section>

        <section className="transactions-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Activity</p>
              <h2>Transactions</h2>
            </div>

            <div className="filters">
              {(['all', 'completed', 'pending', 'refunded'] as Filter[]).map(
                (item) => (
                  <button
                    key={item}
                    className={filter === item ? 'filter active' : 'filter'}
                    onClick={() => handleFilter(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading transactions...</p>
            </div>
          ) : (
            <TransactionTable
              transactions={filteredTransactions}
              onSelect={setSelected}
              onSettle={handleSettle}
            />
          )}
        </section>

        <footer className="footer-note">
          Demo environment · Transaction state is stored in the NestJS service.
        </footer>
      </main>

      {selected && (
        <TransactionModal
          transaction={selected}
          onClose={() => setSelected(null)}
          onSettle={handleSettle}
        />
      )}

      {actionLoading && (
        <div className="action-toast">
          Updating settlement status...
        </div>
      )}
    </div>
  );
}
