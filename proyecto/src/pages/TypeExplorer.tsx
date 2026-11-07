import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { fetchTypes } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import GroupFilters from '../components/personality/GroupFilters';
import PersonalityGrid from '../components/personality/PersonalityGrid';
import DimensionFilterPopover from '../components/personality/DimensionFilterPopover';
import SectionHeading from '../components/ui/SectionHeading';
import SearchField from '../components/ui/SearchField';
import ResultStatus from '../components/ui/ResultStatus';
import { DIMENSIONS } from '../constants/dimensions';
import type { Group } from '../types';
import { getGroup, isGroupKey } from '../utils/groups';

function parseGroup(value: string | null): Group {
  return isGroupKey(value) ? value : 'all';
}

/** Keeps only valid pole letters, at most one per dimension, in dimension order (e.g. "ne" becomes "EN"). */
function parseDims(value: string | null): string {
  const letters = (value ?? '').toUpperCase();
  return DIMENSIONS.map((dimension) => dimension.poles.find((pole) => letters.includes(pole.letter))?.letter ?? '').join('');
}

/** Does this MBTI code have every selected letter in the right position (E/I, S/N, T/F, J/P)? */
function matchesDims(code: string, dims: string): boolean {
  return DIMENSIONS.every((dimension, index) => {
    const wanted = dims.split('').find((letter) => dimension.poles.some((pole) => pole.letter === letter));
    return !wanted || code[index]?.toUpperCase() === wanted;
  });
}

function TypeExplorer() {
  const { data, status } = useFetch(fetchTypes);
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const group = parseGroup(params.get('group'));
  const search = params.get('q') ?? '';
  const dims = parseDims(params.get('dims'));

  const visibleTypes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (data ?? []).filter((type) => {
      const text = `${type.code} ${type.name} ${type.title}`.toLowerCase();
      return text.includes(query) && (group === 'all' || getGroup(type.code) === group) && matchesDims(type.code, dims);
    });
  }, [data, search, group, dims]);

  const counts = useMemo(
    () =>
      (data ?? []).reduce<Record<Group, number>>(
        (result, type) => {
          result.all += 1;
          result[getGroup(type.code)] += 1;
          return result;
        },
        { all: 0, analysts: 0, diplomats: 0, explorers: 0, sentinels: 0 },
      ),
    [data],
  );

  // Search, group and dimensions live in the URL, so a filtered view can be shared or reloaded.
  function updateParams(next: { group?: Group; q?: string; dims?: string }) {
    const nextGroup = next.group ?? group;
    const nextQuery = next.q ?? search;
    const nextDims = next.dims ?? dims;
    setParams({
      ...(nextGroup === 'all' ? {} : { group: nextGroup }),
      ...(nextQuery ? { q: nextQuery } : {}),
      ...(nextDims ? { dims: nextDims } : {}),
    });
  }

  // Selecting a letter replaces the other side of the same dimension; selecting it again clears it.
  function toggleDimension(letter: string) {
    const dimension = DIMENSIONS.find((item) => item.poles.some((pole) => pole.letter === letter));
    if (!dimension) return;
    const sideLetters = dimension.poles.map((pole) => pole.letter);
    const kept = dims.split('').filter((item) => !sideLetters.includes(item));
    const alreadyActive = dims.includes(letter);
    updateParams({ dims: parseDims([...kept, ...(alreadyActive ? [] : [letter])].join('')) });
  }

  if (status === 'loading') return <ResultStatus kind="loading">Loading personalities...</ResultStatus>;
  if (status === 'error') return <ResultStatus kind="error">We could not load the personalities. Please try again.</ResultStatus>;

  const activeFilters = dims.length;

  return (
    <section>
      <SectionHeading eyebrow="THE 16 ARCHETYPES" title="Explore the 16 types" description="Find a type to learn more about it." />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <GroupFilters selected={group} counts={counts} onSelect={(next) => updateParams({ group: next })} />
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <SearchField value={search} onChange={(value) => updateParams({ q: value })} />
          <DimensionFilterPopover
            open={filtersOpen}
            selected={dims}
            resultCount={visibleTypes.length}
            onOpenChange={setFiltersOpen}
            onToggle={toggleDimension}
            onClear={() => updateParams({ dims: '' })}
          />
        </div>
      </div>

      {activeFilters > 0 && (
        <p className="mb-2 text-sm text-muted">
          Dimensions: <strong className="text-fg">{dims.split('').join(' · ')}</strong>
        </p>
      )}
      <p className="mb-4 text-sm text-muted" aria-live="polite">{visibleTypes.length} results</p>
      {visibleTypes.length === 0 ? <ResultStatus kind="empty">No matches found.</ResultStatus> : <PersonalityGrid personalities={visibleTypes} />}
    </section>
  );
}

export default TypeExplorer;
