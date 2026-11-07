import { Link } from 'react-router';
import type { PersonalityType } from '../../types';
import { GROUP_LABELS, getGroup } from '../../utils/groups';

interface Props { personality: PersonalityType }

function PersonalityCard({ personality }: Props) {
  const group = getGroup(personality.code);
  return (
    <Link
      className={`tone-${group} group relative flex min-h-[300px] flex-col overflow-hidden rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface)] p-5 transition duration-300 hover:-translate-y-2 hover:border-[var(--g-strong)] hover:shadow-[0_18px_45px_var(--shadow)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--g-strong)]`}
      to={`/types/${personality.code}`}
      aria-label={`View details for ${personality.name}`}
    >
      {/* Top stripe in the group color */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-[var(--g-strong)]" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--g-soft)] blur-2xl" />

      <div className="relative flex items-start justify-between">
        <span className="rounded-full bg-[var(--g-soft)] px-3 py-1 text-xs font-bold tracking-widest text-[var(--g-strong)]">
          {GROUP_LABELS[group].toUpperCase()}
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)] text-lg text-[var(--g-strong)] transition group-hover:rotate-45" aria-hidden="true">↗</span>
      </div>

      <div className="relative mt-8">
        <span className="text-6xl font-bold tracking-[-.1em] text-[var(--g-strong)] opacity-25">{personality.code}</span>
        <h3 className="mt-[-.7rem] text-2xl font-bold text-[var(--text)]">{personality.name}</h3>
        <p className="mt-2 max-w-[12rem] text-sm leading-5 text-[var(--muted)]">{personality.title}</p>
      </div>

      <span className="relative mt-auto pt-6 text-sm font-bold text-[var(--g-strong)]">
        View profile <span className="ml-1 transition group-hover:ml-3">→</span>
      </span>
    </Link>
  );
}
export default PersonalityCard;
