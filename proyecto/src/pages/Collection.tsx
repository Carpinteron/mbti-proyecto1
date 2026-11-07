import { useMemo } from 'react';
import { Link } from 'react-router';
import EmptyCollection from '../components/collection/EmptyCollection';
import FilterBar from '../components/personality/FilterBar';
import { fetchTypes } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePersonalityFilters } from '../hooks/usePersonalityFilters';
import { useCollection } from '../context/CollectionContext';
import { useCollectionActions } from '../hooks/useCollectionActions';
import ResultStatus from '../components/ui/ResultStatus';
import { Button } from '../components/ui/Button';
import { TONE_CLASS, getGroup } from '../utils/groups';

function Collection() {
  const { collection } = useCollection();
  const { requestRemove } = useCollectionActions();
  const { data, status } = useFetch(fetchTypes);

  const saved = useMemo(() => (data ?? []).filter((type) => collection.includes(type.code)), [data, collection]);
  // Same search / group / dimension filters as Explore, applied to the saved personalities only.
  const filters = usePersonalityFilters(saved);

  return (
    <section>
      <h1 className="text-5xl font-bold">Collection</h1>
      {collection.length > 0 && <p className="my-3 text-muted">Profiles to revisit whenever you want.</p>}

      {collection.length === 0 ? (
        <EmptyCollection />
      ) : status === 'loading' ? (
        <ResultStatus kind="loading">Loading your collection...</ResultStatus>
      ) : status === 'error' ? (
        <ResultStatus kind="error">We could not load your collection. Please try again.</ResultStatus>
      ) : (
        <>
          <FilterBar filters={filters} />
          {filters.visible.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <ResultStatus kind="empty">None of your saved personalities match these filters.</ResultStatus>
              <Button variant="outline" size="pill" onClick={filters.clearAll}>Clear filters</Button>
            </div>
          ) : (
            <ul className="grid gap-3">
              {filters.visible.map((type) => (
                <li key={type.code} className={`${TONE_CLASS[getGroup(type.code)]} flex items-center gap-4 rounded-xl border border-line bg-surface p-3`}>
                  <div className="grid h-20 w-28 place-items-center rounded-lg bg-tone-soft text-xl font-bold tracking-wider text-tone-strong" aria-hidden="true">{type.code}</div>
                  <div className="flex-1">
                    <h2 className="font-bold"><Link className="hover:text-tone-strong" to={`/types/${type.code}`}>{type.name}</Link></h2>
                    <p className="text-sm text-muted">{type.title}</p>
                  </div>
                  <Button
                    variant="outline"
                    color="danger"
                    size="sm"
                    aria-label={`Remove ${type.name} from collection`}
                    onClick={() => void requestRemove(type.code)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

export default Collection;
