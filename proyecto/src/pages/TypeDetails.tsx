import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { fetchType } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { useCollection } from '../context/CollectionContext';
import { useCollectionActions } from '../hooks/useCollectionActions';
import ResultStatus from '../components/ui/ResultStatus';
import ErrorState from '../components/ui/ErrorState';
import { Button, LinkButton } from '../components/ui/Button';
import { GROUP_LABELS, TONE_CLASS, getGroup } from '../utils/groups';

function Bloque({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-line bg-surface p-6">
      <span className="text-xs font-bold tracking-widest text-tone-strong">{eyebrow}</span>
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
        <LinkButton to="/types">Explore the types →</LinkButton>
      </ErrorState>
    );
  }

  const group = getGroup(type.code);
  const saved = isSaved(type.code);
  const listClass = 'list-disc space-y-2 pl-5 text-muted marker:text-tone-strong';

  return (
    <article className={TONE_CLASS[group]}>
      <Link className="text-sm font-bold text-accent hover:underline" to="/types">← Back to explore</Link>

      <header className="my-8 flex flex-wrap items-center gap-6 rounded-xl border border-line bg-gradient-to-r from-tone-soft to-surface p-8">
        <strong className="text-5xl tracking-tight text-tone-strong">{type.code}</strong>
        <div>
          <span className="text-xs font-bold tracking-widest text-tone-strong">{GROUP_LABELS[group].toUpperCase()} · {type.title}</span>
          <h1 className="text-5xl font-bold">{type.name}</h1>
        </div>
        <Button
          variant={saved ? 'solid' : 'outline'}
          size="pill"
          aria-pressed={saved}
          className="ml-auto hover:-translate-y-0.5"
          onClick={() => toggle(type.code)}
        >
          {saved ? '★ Saved' : '☆ Save'}
        </Button>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <Bloque eyebrow="THEIR ESSENCE" title="How their mind works">
          <p className="leading-7 text-muted">{type.cognitive}</p>
        </Bloque>
        <Bloque eyebrow="STRENGTHS" title="What drives them">
          <div className="flex flex-wrap gap-2">
            {type.strengths.map((item) => (
              <span key={item} className="rounded-full bg-tone-soft px-3 py-2 text-sm text-fg">{item}</span>
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
