import PersonalityCard from './PersonalityCard';
import type { PersonalityType } from '../../types';

interface Props {
  personalities: PersonalityType[];
}

function PersonalityGrid({ personalities }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {personalities.map((personality) => <PersonalityCard key={personality.code} personality={personality} />)}
    </div>
  );
}

export default PersonalityGrid;
