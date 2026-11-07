import ToggleButton from '../ui/ToggleButton';
import type { Group } from '../../types';
import { GROUP_LABELS, TONE_CLASS } from '../../utils/groups';

interface Props {
  selected: Group;
  counts: Record<Group, number>;
  onSelect: (group: Group) => void;
}

const labels: Record<Group, string> = { all: 'All', ...GROUP_LABELS };

function GroupFilters({ selected, counts, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by personality group">
      {(Object.keys(labels) as Group[]).map((group) => (
       
        <ToggleButton
          key={group}
          active={selected === group}
          tone={group === 'all' ? 'accent' : 'group'}
          onClick={() => onSelect(group)}
          className={`rounded-md px-3 py-2 text-sm font-bold ${group === 'all' ? '' : TONE_CLASS[group]}`}
        >
          {labels[group]} <span className="ml-1 opacity-70">({counts[group]})</span>
        </ToggleButton>
      ))}
    </div>
  );
}

export default GroupFilters;
