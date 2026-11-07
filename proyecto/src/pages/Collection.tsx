import { Link } from 'react-router';
import EmptyCollection from '../components/collection/EmptyCollection';
import { fetchTypes } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { useCollection } from '../context/CollectionContext';
import { useCollectionActions } from '../hooks/useCollectionActions';
import ResultStatus from '../components/ui/ResultStatus';
import { getGroup } from '../utils/groups';

function Collection() {
  const { collection } = useCollection();
  const { requestRemove } = useCollectionActions();
  const { data, status } = useFetch(fetchTypes);

  const saved = (data ?? []).filter((type) => collection.includes(type.code));

  return (
    <section>
      <h1 className="text-5xl font-bold">Collection</h1>
      {collection.length > 0 && <p className="my-3 text-[var(--muted)]">Profiles to revisit whenever you want.</p>}

      {collection.length === 0 ? (
        <EmptyCollection />
      ) : status === 'loading' ? (
        <ResultStatus kind="loading">Loading your collection...</ResultStatus>
      ) : status === 'error' ? (
        <ResultStatus kind="error">We could not load your collection. Please try again.</ResultStatus>
      ) : (
        <ul className="grid gap-3">
          {saved.map((type) => (
            <li key={type.code} className={`tone-${getGroup(type.code)} flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3`}>
              <div className="grid h-20 w-28 place-items-center rounded-lg bg-[var(--g-soft)] text-xl font-bold tracking-wider text-[var(--g-strong)]" aria-hidden="true">{type.code}</div>
              <div className="flex-1">
                <h2 className="font-bold"><Link className="hover:text-[var(--g-strong)]" to={`/types/${type.code}`}>{type.name}</Link></h2>
                <p className="text-sm text-[var(--muted)]">{type.title}</p>
              </div>
              <button
                type="button"
                className="rounded-md border border-[var(--danger)]/40 px-3 py-2 text-sm text-[var(--danger)] hover:bg-[var(--danger)]/10"
                aria-label={`Remove ${type.name} from collection`}
                onClick={() => void requestRemove(type.code)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Collection;
