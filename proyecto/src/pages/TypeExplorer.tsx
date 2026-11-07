import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { fetchTypes } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import GroupFilters from '../components/personality/GroupFilters';
import PersonalityGrid from '../components/personality/PersonalityGrid';
import SectionHeading from '../components/ui/SectionHeading';
import SearchField from '../components/ui/SearchField';
import ResultStatus from '../components/ui/ResultStatus';
import type { Group } from '../types';
import { GROUP_KEYS, getGroup, type GroupKey } from '../utils/groups';

function parseGroup(value: string | null): Group {
  return GROUP_KEYS.includes(value as GroupKey) ? (value as GroupKey) : 'all';
}

function TypeExplorer() {
  const { data, status } = useFetch(fetchTypes);
  const [params, setParams] = useSearchParams();
  const group = parseGroup(params.get('group'));
  const search = params.get('q') ?? '';

  const visibleTypes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (data ?? []).filter((type) => {
      const text = `${type.code} ${type.name} ${type.title}`.toLowerCase();
      return text.includes(query) && (group === 'all' || getGroup(type.code) === group);
    });
  }, [data, search, group]);

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

  // Search and group live in the URL, so a filtered view can be shared or reloaded.
  function updateParams(next: { group?: Group; q?: string }) {
    const nextGroup = next.group ?? group;
    const nextQuery = next.q ?? search;
    setParams({ ...(nextGroup === 'all' ? {} : { group: nextGroup }), ...(nextQuery ? { q: nextQuery } : {}) });
  }

  if (status === 'loading') return <ResultStatus kind="loading">Loading personalities...</ResultStatus>;
  if (status === 'error') return <ResultStatus kind="error">We could not load the personalities. Please try again.</ResultStatus>;

  return (
    <section>
      <SectionHeading eyebrow="THE 16 ARCHETYPES" title="Explore the 16 types" description="Find a type to learn more about it." />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <GroupFilters selected={group} counts={counts} onSelect={(next) => updateParams({ group: next })} />
        <SearchField value={search} onChange={(value) => updateParams({ q: value })} />
      </div>
      <p className="mb-4 text-sm text-[var(--muted)]" aria-live="polite">{visibleTypes.length} results</p>
      {visibleTypes.length === 0 ? <ResultStatus kind="empty">No matches found.</ResultStatus> : <PersonalityGrid personalities={visibleTypes} />}
    </section>
  );
}

export default TypeExplorer;
