'use client';

import type { FilterType } from '../app/page';

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' }
];

export default function TodoFilters({ filter, onFilterChange }: TodoFiltersProps) {
  return (
    <div className="filters" role="group" aria-label="Filter todos">
      {FILTERS.map(f => (
        <button
          key={f.value}
          className={`filter-btn${filter === f.value ? ' active' : ''}`}
          onClick={() => onFilterChange(f.value)}
          aria-pressed={filter === f.value}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
