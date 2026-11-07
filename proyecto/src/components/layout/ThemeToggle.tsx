import type { Theme } from '../../types';

interface Props {
  theme: Theme;
  onToggle: () => void;
}

function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--on-chrome)]/10 p-0 text-sm leading-none text-[var(--on-chrome)] transition hover:bg-[var(--on-chrome)]/20"
    >
      {isDark ? '☼' : '☾'}
    </button>
  );
}

export default ThemeToggle;
