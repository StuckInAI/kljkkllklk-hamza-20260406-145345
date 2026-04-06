'use client';

interface TodoStatsProps {
  total: number;
  active: number;
  completed: number;
  onClearCompleted: () => void;
}

export default function TodoStats({
  total,
  active,
  completed,
  onClearCompleted
}: TodoStatsProps) {
  if (total === 0) return null;

  return (
    <div className="stats">
      <span>
        <strong>{active}</strong> item{active !== 1 ? 's' : ''} left
      </span>
      <span>
        <strong>{completed}</strong> completed
      </span>
      {completed > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}
