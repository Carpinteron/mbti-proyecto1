import { fetchTypes } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePersonalityFilters } from '../hooks/usePersonalityFilters';
import FilterBar from '../components/personality/FilterBar';
import PersonalityGrid from '../components/personality/PersonalityGrid';
import SectionHeading from '../components/ui/SectionHeading';
import ResultStatus from '../components/ui/ResultStatus';

function TypeExplorer() {
  const { data, status } = useFetch(fetchTypes);
  const filters = usePersonalityFilters(data ?? []);

  if (status === 'loading') return <ResultStatus kind="loading">Loading personalities...</ResultStatus>;
  if (status === 'error') return <ResultStatus kind="error">We could not load the personalities. Please try again.</ResultStatus>;

  return (
    <section>
      <SectionHeading eyebrow="THE 16 ARCHETYPES" title="Explore the 16 types" description="Find a type to learn more about it." />
      <FilterBar filters={filters} />
      {filters.visible.length === 0 ? <ResultStatus kind="empty">No matches found.</ResultStatus> : <PersonalityGrid personalities={filters.visible} />}
    </section>
  );
}

export default TypeExplorer;
