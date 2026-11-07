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
      className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-on-chrome/10 p-0 text-sm leading-none text-on-chrome transition hover:bg-on-chrome/20"
    >
      {isDark ? '☼' : '☾'}
    </button>
  );
}

export default ThemeToggle;
