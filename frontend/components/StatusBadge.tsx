type Status = 'completed' | 'pending' | 'refunded';

export default function StatusBadge({ status }: { status: Status }) {
  return <span className={`status status-${status}`}>{status}</span>;
}
