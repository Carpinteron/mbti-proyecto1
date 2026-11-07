import { useEffect, useId, useRef } from 'react';
import { DIMENSIONS } from '../../constants/dimensions';
import { Button } from '../ui/Button';
import ToggleButton from '../ui/ToggleButton';

interface Props {
  open: boolean;
  /** Selected pole letters, e.g. "EN" = Extraverted + Intuitive. At most one per dimension. */
  selected: string;
  resultCount: number;
  onOpenChange: (open: boolean) => void;
  onToggle: (letter: string) => void;
  onClear: () => void;
}

/** "Filters" button with a popover anchored to it (no backdrop) to filter by the 4 MBTI dimensions. */
function DimensionFilterPopover({ open, selected, resultCount, onOpenChange, onToggle, onClear }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const activeCount = selected.length;

  // Close on outside click or Esc (and give focus back to the button on Esc).
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) onOpenChange(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      onOpenChange(false);
      buttonRef.current?.focus();
    }
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <Button
        ref={buttonRef}
        variant={activeCount > 0 || open ? 'outline' : 'neutral'}
        size="sm"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
        Filters
        {activeCount > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-accent text-[11px] text-on-accent">{activeCount}</span>
        )}
      </Button>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label="Filter by dimension"
          className="animate-popover-in origin-top-right motion-reduce:animate-none absolute right-0 top-full z-20 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-line bg-surface p-4 text-fg shadow-pop"
        >
          {/* Little arrow pointing at the button */}
          <span className="absolute -top-1.5 right-6 size-3 rotate-45 border-l border-t border-line bg-surface" aria-hidden="true" />

          <p className="text-sm text-muted">Pick a side in any dimension. Leave it empty to see both.</p>

          <div className="mt-4 grid gap-3">
            {DIMENSIONS.map((dimension) => (
              <fieldset key={dimension.title}>
                <legend className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-muted">{dimension.title}</legend>
                <div className="grid grid-cols-2 gap-2">
                  {dimension.poles.map((pole) => {
                    const active = selected.includes(pole.letter);
                    return (
                      <ToggleButton
                        key={pole.letter}
                        active={active}
                        onClick={() => onToggle(pole.letter)}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-left"
                      >
                        <span className="text-xl font-bold leading-none">{pole.letter}</span>
                        <span className="text-xs font-semibold">{pole.name}</span>
                      </ToggleButton>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
            <Button variant="link" size="xs" onClick={onClear} disabled={activeCount === 0} className="disabled:no-underline">
              Clear all
            </Button>
            <span className="text-sm text-muted" aria-live="polite">
              {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DimensionFilterPopover;
