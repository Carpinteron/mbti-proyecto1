import { GROUP_KEYS, GROUP_LABELS } from '../../utils/groups';

const BRAIN_IMAGE = '/Imagen2.svg';

// Ring: center radius 285, thickness 72 → the text runs along the middle of the stroke.
const RADIUS = 285;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const QUARTER = CIRCUMFERENCE / 4;
const GAP = 6; // space between segments

/** Decorative background: a slowly spinning four-color ring with a fixed brain illustration. */
function GroupWheel() {
  return (
    <div className="pointer-events-none absolute -right-[16rem] top-1/2 z-0 hidden h-[50rem] w-[50rem] -translate-y-1/2 lg:block" aria-hidden="true">
      {/* Segments + labels share a single <g> so they rotate as one continuous piece. */}
      <svg viewBox="0 0 700 700" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          {/* Circle through the middle of the stroke; starts on the left, clockwise. */}
          <path id="wheel-path" d="M 65 350 A 285 285 0 1 1 635 350 A 285 285 0 1 1 65 350" />
        </defs>
        <g className="wheel-spin">
          <g transform="rotate(180 350 350)">
            {GROUP_KEYS.map((group, i) => (
              <circle
                key={group}
                className={`tone-${group} stroke-[var(--g-strong)]`}
                cx="350" cy="350" r={RADIUS} fill="none" strokeWidth="72"
                strokeDasharray={`${QUARTER - GAP} ${CIRCUMFERENCE}`}
                strokeDashoffset={-i * QUARTER}
              />
            ))}
          </g>
          <text dominantBaseline="central" className="fill-[var(--on-group)] text-[34px] font-bold tracking-[.14em]">
            {GROUP_KEYS.map((group, i) => (
              <textPath key={group} href="#wheel-path" startOffset={`${12.5 + i * 25}%`} textAnchor="middle">
                {GROUP_LABELS[group].toUpperCase()}
              </textPath>
            ))}
          </text>
        </g>
      </svg>
      <img src={BRAIN_IMAGE} alt="" className="absolute left-1/2 top-1/2 w-[33rem] max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl" />
    </div>
  );
}

export default GroupWheel;
