export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export async function getTransactions(status = 'all') {
  const query = status !== 'all' ? `?status=${status}` : '';
  const response = await fetch(`${API_URL}/transactions${query}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to load transactions');
  }

  return response.json();
}

export async function getSummary() {
  const response = await fetch(`${API_URL}/transactions/summary`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to load summary');
  }

  return response.json();
}

export async function settleTransaction(id: string) {
  const response = await fetch(`${API_URL}/transactions/${id}/settle`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Unable to settle transaction');
  }

  return response.json();
}
