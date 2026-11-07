import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ToastMessage } from '../../types';

interface Props { toast: ToastMessage; onClose: () => void }

const DURATION = 4500;

// Each kind has its own color, title and icon (stroke SVG, no emojis).
const styles = {
  success: { title: 'Yay! Everything worked!', color: '#10a36b', icon: <path d="M7.5 12.5l3 3 6-6.5" /> },
  info: { title: 'Did you know?', color: '#0b74c4', icon: <path d="M12 11v5.5M12 7.5h.01" /> },
  error: { title: 'Uh oh, something went wrong', color: '#f5a000', icon: <path d="M12 7v5.5M12 16.5h.01" /> },
} as const;

function Toast({ toast, onClose }: Props) {
  const [paused, setPaused] = useState(false);
  const remaining = useRef(DURATION);
  const startedAt = useRef(0);

  // Auto-dismiss: pauses on hover or focus and resumes with the time that was left.
  useEffect(() => { remaining.current = DURATION; }, [toast.id]);
  useEffect(() => {
    if (paused) return;
    startedAt.current = Date.now();
    const timer = window.setTimeout(onClose, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current -= Date.now() - startedAt.current;
    };
  }, [toast.id, paused, onClose]);

  const style = styles[toast.kind];
  return (
    <div
      key={toast.id}
      role={toast.kind === 'error' ? 'alert' : 'status'}
      aria-live={toast.kind === 'error' ? 'assertive' : 'polite'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ '--t-color': style.color } as CSSProperties}
      className={`toast-in fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[26rem] ${paused ? 'toast-paused' : ''}`}
    >
      {/* Card tinted with the kind color (subtle, but distinct from the page) plus a colored line on the left */}
      <div className="flex items-center gap-4 rounded-lg border border-[var(--t-color)]/30 bg-[color-mix(in_srgb,var(--t-color)_12%,var(--surface))] py-4 pl-3 pr-3 text-[var(--text)] shadow-[0_8px_24px_-6px_var(--shadow)]">
        <span className="w-1 self-stretch rounded-full bg-[var(--t-color)]" aria-hidden="true" />
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--t-color)] text-white">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{style.icon}</svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold">{style.title}</p>
          <p className="mt-0.5 text-sm leading-snug text-[var(--muted)] [overflow-wrap:anywhere]">{toast.message}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close notification" className="grid size-8 shrink-0 place-items-center rounded-lg text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--t-color)]">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </div>
  );
}
export default Toast;
