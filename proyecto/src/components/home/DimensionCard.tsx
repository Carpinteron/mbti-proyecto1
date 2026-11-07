import type { Dimension } from '../../constants/dimensions';
import { TONE_CLASS, type GroupKey } from '../../utils/groups';

interface Props {
  dimension: Dimension;
  group: GroupKey;
  position: number;
}

function DimensionCard({ dimension, group, position }: Props) {
  const [left, right] = dimension.poles;
  return (
    <article className={`${TONE_CLASS[group]} overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold tracking-tight">{dimension.title}</h3>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tone-soft text-sm font-bold text-tone-strong">{position}</span>
      </div>
      <div className="relative mt-5 grid min-h-56 grid-cols-2 overflow-hidden rounded-2xl border border-line">
        <div className="dimension-split-left relative z-[1] bg-surface-2 p-5 pr-8">
          <span className="text-4xl font-bold text-tone-strong">{left.letter}</span>
          <h4 className="mt-2 font-bold">{left.name}</h4>
          <p className="mt-2 text-sm leading-5 text-muted">{left.text}</p>
        </div>
        <div className="dimension-split-right -ml-8 bg-tone-soft p-5 pl-12">
          <span className="text-4xl font-bold text-tone-strong">{right.letter}</span>
          <h4 className="mt-2 font-bold">{right.name}</h4>
          <p className="mt-2 text-sm leading-5 text-muted">{right.text}</p>
        </div>
      </div>
    </article>
  );
}

export default DimensionCard;
