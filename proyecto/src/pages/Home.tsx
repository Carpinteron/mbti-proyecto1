import { LinkButton } from '../components/ui/Button';
import GroupWheel from '../components/home/GroupWheel';
import DimensionsSection from '../components/home/DimensionsSection';

function Home() {
  return (
    <>
      <section className="relative flex min-h-[calc(100vh-220px)] items-center">
        <div className="relative z-[1] w-full max-w-2xl pb-12 pt-2 text-center lg:text-left">
          <h1 className="text-5xl font-light leading-none sm:text-7xl">Discover the 16<br />Personality Archetypes</h1>
          <div className="mt-8 space-y-4 text-base leading-7 text-muted sm:text-lg">
            <p>Every person has a unique way of thinking, feeling and relating to the world. The MBTI (Myers-Briggs Type Indicator) organizes these differences into 16 personality types, known as archetypes.</p>
            <p className="font-bold text-fg">16 types. 4 groups. Infinite ways to see the world.</p>
          </div>
          <LinkButton to="/types" className="mt-10">Explore the types →</LinkButton>
        </div>
        <GroupWheel />
      </section>
      <DimensionsSection />
    </>
  );
}

export default Home;
