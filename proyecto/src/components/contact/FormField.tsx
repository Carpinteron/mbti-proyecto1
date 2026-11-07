import type { ReactNode } from 'react';

export type FieldState = 'neutral' | 'error' | 'ok';

interface Props {
  id: string;
  label: string;
  error?: string;
  /** Extra content shown next to the label (e.g. a character counter). */
  aside?: ReactNode;
  children: ReactNode;
}

/** Label + control + error message. The error lives outside the <label> so screen readers announce it via aria-describedby. */
function FormField({ id, label, error, aside, children }: Props) {
  return (
    <div className="grid content-start gap-2 text-sm">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="font-bold">{label}</label>
        {aside}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs font-medium text-[var(--danger)]">
          <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v4m0 4h.01" /></svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
