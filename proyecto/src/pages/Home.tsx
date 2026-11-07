import { Link } from 'react-router';
import GroupWheel from '../components/home/GroupWheel';
import DimensionsSection from '../components/home/DimensionsSection';

function Home() {
  return (
    <>
      <section className="relative flex min-h-[calc(100vh-220px)] items-center">
        <div className="relative z-[1] w-full max-w-2xl pb-12 pt-2 text-center lg:text-left">
          <h1 className="text-5xl font-light leading-none sm:text-7xl">Discover the 16<br />Personality Archetypes</h1>
          <div className="mt-8 space-y-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
            <p>Every person has a unique way of thinking, feeling and relating to the world. The MBTI (Myers-Briggs Type Indicator) organizes these differences into 16 personality types, known as archetypes.</p>
            <p className="font-bold text-[var(--text)]">16 types. 4 groups. Infinite ways to see the world.</p>
          </div>
          <Link to="/types" className="mt-10 inline-block rounded-full bg-[var(--accent)] px-10 py-4 font-bold text-[var(--on-accent)] shadow-lg transition hover:brightness-110">
            Explore the types →
          </Link>
        </div>
        <GroupWheel />
      </section>
      <DimensionsSection />
    </>
  );
}

export default Home;
