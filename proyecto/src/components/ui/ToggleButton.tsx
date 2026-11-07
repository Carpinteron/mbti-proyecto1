import type { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
  active: boolean;
  /** `accent` uses the pink accent; `group` uses the --tone-* colors of the closest tone-* ancestor. */
  tone?: 'accent' | 'group';
}

const BASE =
  'border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const ACTIVE = {
  accent: 'border-accent bg-accent/15 text-accent',
  group: 'border-tone-strong bg-tone-soft text-tone-strong',
} as const;

const INACTIVE = 'border-line text-muted hover:bg-surface-2 hover:text-fg';

/** Pressable chip for filters. Shape and spacing come from `className`; color comes from `active`. */
function ToggleButton({ active, tone = 'accent', className = '', type = 'button', ...props }: Props) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={`${BASE} ${active ? ACTIVE[tone] : INACTIVE} ${className}`.trim()}
      {...props}
    />
  );
}

export default ToggleButton;
