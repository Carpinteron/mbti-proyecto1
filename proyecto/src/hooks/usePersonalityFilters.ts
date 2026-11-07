import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { DIMENSIONS } from '../constants/dimensions';
import type { Group, PersonalityType } from '../types';
import { countByGroup, matchesDims, parseDims } from '../utils/filters';
import { getGroup, isGroupKey } from '../utils/groups';

/**
 * Search + group + MBTI-dimension filtering over a list of personalities.
 * The state lives in the URL (?q=&group=&dims=), so a filtered view can be shared or reloaded.
 * Each page has its own URL, so Explore and Collection keep independent filters.
 */
export function usePersonalityFilters(types: PersonalityType[]) {
  const [params, setParams] = useSearchParams();
  const groupParam = params.get('group');
  const group: Group = isGroupKey(groupParam) ? groupParam : 'all';
  const search = params.get('q') ?? '';
  const dims = parseDims(params.get('dims'));

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return types.filter((type) => {
      const text = `${type.code} ${type.name} ${type.title}`.toLowerCase();
      return text.includes(query) && (group === 'all' || getGroup(type.code) === group) && matchesDims(type.code, dims);
    });
  }, [types, search, group, dims]);

  // Group counts ignore the active filters, so the buttons always show what each group holds.
  const counts = useMemo(() => countByGroup(types), [types]);

  function update(next: { group?: Group; q?: string; dims?: string }) {
    const nextGroup = next.group ?? group;
    const nextQuery = next.q ?? search;
    const nextDims = next.dims ?? dims;
    // `replace` keeps filter changes out of the browser history.
    setParams(
      {
        ...(nextGroup === 'all' ? {} : { group: nextGroup }),
        ...(nextQuery ? { q: nextQuery } : {}),
        ...(nextDims ? { dims: nextDims } : {}),
      },
      { replace: true },
    );
  }

  // Selecting a letter replaces the other side of the same dimension; selecting it again clears it.
  function toggleDimension(letter: string) {
    const dimension = DIMENSIONS.find((item) => item.poles.some((pole) => pole.letter === letter));
    if (!dimension) return;
    const sideLetters = dimension.poles.map((pole) => pole.letter);
    const kept = dims.split('').filter((item) => !sideLetters.includes(item));
    const alreadyActive = dims.includes(letter);
    update({ dims: parseDims([...kept, ...(alreadyActive ? [] : [letter])].join('')) });
  }

  return {
    group,
    search,
    dims,
    visible,
    counts,
    hasActiveFilters: group !== 'all' || search !== '' || dims !== '',
    setGroup: (next: Group) => update({ group: next }),
    setSearch: (next: string) => update({ q: next }),
    toggleDimension,
    clearDimensions: () => update({ dims: '' }),
    clearAll: () => setParams({}, { replace: true }),
  };
}

export type PersonalityFilters = ReturnType<typeof usePersonalityFilters>;
