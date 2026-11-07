import { useState } from 'react';
import GroupFilters from './GroupFilters';
import DimensionFilterPopover from './DimensionFilterPopover';
import SearchField from '../ui/SearchField';
import type { PersonalityFilters } from '../../hooks/usePersonalityFilters';

interface Props {
  filters: PersonalityFilters;
}

/** Group buttons + search + dimension filters, plus the active-dimensions hint and the result count. */
function FilterBar({ filters }: Props) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <GroupFilters selected={filters.group} counts={filters.counts} onSelect={filters.setGroup} />
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <SearchField value={filters.search} onChange={filters.setSearch} />
          <DimensionFilterPopover
            open={popoverOpen}
            selected={filters.dims}
            resultCount={filters.visible.length}
            onOpenChange={setPopoverOpen}
            onToggle={filters.toggleDimension}
            onClear={filters.clearDimensions}
          />
        </div>
      </div>

      {filters.dims && (
        <p className="mb-2 text-sm text-muted">
          Dimensions: <strong className="text-fg">{filters.dims.split('').join(' · ')}</strong>
        </p>
      )}
      <p className="mb-4 text-sm text-muted" aria-live="polite">{filters.visible.length} results</p>
    </>
  );
}

export default FilterBar;
