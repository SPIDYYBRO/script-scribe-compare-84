
interface HistoryHeaderProps {
  title: string;
  subtitle: string;
}

export function HistoryHeader({ title, subtitle }: HistoryHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

