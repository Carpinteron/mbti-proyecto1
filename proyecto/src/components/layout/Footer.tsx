import { Link } from 'react-router';

function Footer() {
  return (
    <footer className="relative z-[1] rounded-t-[3rem] bg-chrome px-6 pb-5 pt-6 text-on-chrome sm:mx-8 sm:px-10 lg:mx-12">
      
      <div className="mx-auto  flex max-w-7xl flex-col gap-1 border-t border-on-chrome/20 pt-3 text-xs opacity-75 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} MBTI Personalities</span>
         <nav aria-label="Footer navigation" className="flex gap-6 text-sm font-bold">
          <Link className="hover:text-accent" to="/types">Explore</Link>
          <Link className="hover:text-accent" to="/collection">Collection</Link>
          <Link className="hover:text-accent" to="/contact">Contact</Link>
        </nav>
        <span>Data by <a className="underline" href="https://personality.fyi/api/" target="_blank" rel="noreferrer">Personality.fyi</a> · CC0</span>
      </div>
    </footer>
  );
}
export default Footer;
