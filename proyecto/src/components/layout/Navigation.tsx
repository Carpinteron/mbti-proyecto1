import { NavLink } from 'react-router';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useCollection } from '../../context/CollectionContext';
import { useTheme } from '../../hooks/useTheme';

const navLink = 'rounded-full px-3 py-1.5 transition hover:bg-[var(--on-chrome)]/10 [&.active]:bg-[var(--on-chrome)] [&.active]:text-[var(--chrome)]';
const bar = 'flex h-14 items-center rounded-full border border-[var(--border)] bg-[var(--chrome)]/80 text-[var(--on-chrome)] shadow-lg backdrop-blur-md';

function Navigation() {
  const { collection } = useCollection();
  const { theme, toggleTheme } = useTheme();
  const total = collection.length;

  return (
    <header className="sticky top-0 z-10 px-4 pt-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-6">
        <div className={`${bar} shrink-0 px-7`}>
          <Logo />
        </div>

        <div className={`${bar} min-w-0 flex-1 gap-4 pl-6 pr-3`}>
          <nav aria-label="Main navigation" className="flex flex-1 justify-center gap-1 overflow-x-auto text-[11px] font-bold uppercase tracking-[.14em]">
            <NavLink className={navLink} to="/" end>Home</NavLink>
            <NavLink className={navLink} to="/types">Explore</NavLink>
            <NavLink className={navLink} to="/collection">
              Collection {total > 0 && <span className="ml-1 rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[10px] tracking-normal text-[var(--on-accent)]">{total}</span>}
            </NavLink>
            <NavLink className={navLink} to="/contact">Contact</NavLink>
          </nav>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
  );
}
export default Navigation;
