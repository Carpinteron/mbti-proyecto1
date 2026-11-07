import type { Group } from '../../types';
import { GROUP_LABELS } from '../../utils/groups';

interface Props {
  selected: Group;
  counts: Record<Group, number>;
  onSelect: (group: Group) => void;
}

const labels: Record<Group, string> = { all: 'All', ...GROUP_LABELS };

function GroupFilters({ selected, counts, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by personality group">
      {(Object.keys(labels) as Group[]).map((group) => {
        const active = selected === group;
        // "All" uses the accent color; each group uses its own color
        const color = group === 'all'
          ? 'border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]'
          : 'border-[var(--g-strong)] bg-[var(--g-soft)] text-[var(--g-strong)]';
        return (
          <button
            type="button"
            key={group}
            aria-pressed={active}
            onClick={() => onSelect(group)}
            className={`tone-${group} rounded-md border px-3 py-2 text-sm font-bold transition ${
              active ? color : 'border-[var(--border)] text-[var(--muted)] hover:bg-[var(--g-soft,var(--surface-2))] hover:text-[var(--text)]'
            }`}
          >
            {labels[group]} <span className="ml-1 opacity-70">({counts[group]})</span>
          </button>
        );
      })}
    </div>
  );
}

export default GroupFilters;
