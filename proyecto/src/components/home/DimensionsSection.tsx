import DimensionCard from './DimensionCard';
import { DIMENSIONS } from '../../constants/dimensions';
import { GROUP_KEYS } from '../../utils/groups';

function DimensionsSection() {
  return (
    <section className="relative z-[1] mt-20 pb-8" aria-labelledby="dimensions-title">
      <div className="max-w-3xl text-left">
        <span className="text-xs font-bold tracking-[.2em] text-[var(--accent)]">HOW PERSONALITY WORKS</span>
        <h2 id="dimensions-title" className="mt-4 text-4xl font-light sm:text-5xl">The 4 dimensions</h2>
        <div className="mt-5 h-1 w-16 rounded-full bg-[var(--accent)]" aria-hidden="true" />
        <div className="mt-6 space-y-3 text-base leading-7 text-[var(--muted)] sm:text-lg">
          <p>Grounded in four personality dimensions, these 16 types reflect unique preferences in how we draw energy, process information, make decisions, and structure our lives.</p>
          <p>Grouped into four distinct families—<strong className="text-[var(--text)]">Analysts, Diplomats, Sentinels, and Explorers</strong>—each offers its own strengths, traits, and worldview.</p>
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:gap-6">
        {DIMENSIONS.map((dimension, i) => (
          <DimensionCard key={dimension.title} dimension={dimension} group={GROUP_KEYS[i]} position={i + 1} />
        ))}
      </div>
    </section>
  );
}

export default DimensionsSection;
