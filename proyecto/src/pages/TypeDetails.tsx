import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { fetchType } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { useCollection } from '../context/CollectionContext';
import { useCollectionActions } from '../hooks/useCollectionActions';
import ResultStatus from '../components/ui/ResultStatus';
import ErrorState from '../components/ui/ErrorState';
import { GROUP_LABELS, getGroup } from '../utils/groups';

function Bloque({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <span className="text-xs font-bold tracking-widest text-[var(--g-strong)]">{eyebrow}</span>
      <h2 className="my-3 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function TypeDetails() {
  const { id = '' } = useParams();
  const { data: type, status } = useFetch((signal) => fetchType(id, signal), id);
  const { isSaved } = useCollection();
  const { toggle } = useCollectionActions();

  if (status === 'loading') return <ResultStatus kind="loading">Loading profile...</ResultStatus>;
  if (status === 'error' || !type) {
    return (
      <ErrorState
        title="We could not load this personality"
        message="It may not exist, or the connection failed. Try again in a moment or explore the other types."
      >
        <Link
          to="/types"
          className="rounded-full bg-[var(--accent)] px-10 py-4 font-bold text-[var(--on-accent)] shadow-lg transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Explore the types →
        </Link>
      </ErrorState>
    );
  }

  const group = getGroup(type.code);
  const saved = isSaved(type.code);
  const listClass = 'list-disc space-y-2 pl-5 text-[var(--muted)] marker:text-[var(--g-strong)]';

  return (
    <article className={`tone-${group}`}>
      <Link className="text-sm font-bold text-[var(--accent)] hover:underline" to="/types">← Back to explore</Link>

      <header className="my-8 flex flex-wrap items-center gap-6 rounded-xl border border-[var(--border)] bg-gradient-to-r from-[var(--g-soft)] to-[var(--surface)] p-8">
        <strong className="text-5xl tracking-tight text-[var(--g-strong)]">{type.code}</strong>
        <div>
          <span className="text-xs font-bold tracking-widest text-[var(--g-strong)]">{GROUP_LABELS[group].toUpperCase()} · {type.title}</span>
          <h1 className="text-5xl font-bold">{type.name}</h1>
        </div>
        <button
          type="button"
          aria-pressed={saved}
          className={`ml-auto rounded-full px-5 py-2 font-bold transition hover:-translate-y-0.5 ${saved ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'border border-[var(--accent)] text-[var(--accent)]'}`}
          onClick={() => toggle(type.code)}
        >
          {saved ? '★ Saved' : '☆ Save'}
        </button>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <Bloque eyebrow="THEIR ESSENCE" title="How their mind works">
          <p className="leading-7 text-[var(--muted)]">{type.cognitive}</p>
        </Bloque>
        <Bloque eyebrow="STRENGTHS" title="What drives them">
          <div className="flex flex-wrap gap-2">
            {type.strengths.map((item) => (
              <span key={item} className="rounded-full bg-[var(--g-soft)] px-3 py-2 text-sm text-[var(--text)]">{item}</span>
            ))}
          </div>
        </Bloque>
        <Bloque eyebrow="SHADOW SIDE" title="What can drain them">
          <ul className={listClass}>{type.shadow.map((item) => <li key={item}>{item}</li>)}</ul>
        </Bloque>
        <Bloque eyebrow="IN THEIR ENVIRONMENT" title="They need room to">
          <ul className={listClass}>{type.drains.map((item) => <li key={item}>{item}</li>)}</ul>
        </Bloque>
      </div>
    </article>
  );
}
export default TypeDetails;
