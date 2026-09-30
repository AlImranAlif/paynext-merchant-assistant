interface SummaryCardProps {
  label: string;
  value: string;
  hint: string;
}

export default function SummaryCard({ label, value, hint }: SummaryCardProps) {
  return (
    <div className="summary-card">
      <p className="summary-label">{label}</p>
      <h3>{value}</h3>
      <p className="summary-hint">{hint}</p>
    </div>
  );
}
