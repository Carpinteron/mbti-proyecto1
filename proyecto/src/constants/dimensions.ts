export interface Pole {
  letter: string;
  name: string;
  text: string;
}

export interface Dimension {
  title: string;
  poles: [Pole, Pole];
}

export const DIMENSIONS: Dimension[] = [
  { title: 'Energy', poles: [
    { letter: 'E', name: 'Extraverted', text: 'Prefers interaction and social environments.' },
    { letter: 'I', name: 'Introverted', text: 'Tends to prefer spaces for reflection and more selective interaction.' },
  ] },
  { title: 'Information processing', poles: [
    { letter: 'S', name: 'Observant', text: 'Focuses on concrete information and experiences.' },
    { letter: 'N', name: 'Intuitive', text: 'Focuses on possibilities, patterns and ideas.' },
  ] },
  { title: 'Decision making', poles: [
    { letter: 'T', name: 'Thinking', text: 'Prioritizes logical analysis.' },
    { letter: 'F', name: 'Feeling', text: 'Considers values and the effects on people.' },
  ] },
  { title: 'Lifestyle', poles: [
    { letter: 'J', name: 'Judging', text: 'Prefers planning and structure.' },
    { letter: 'P', name: 'Prospecting', text: 'Prefers flexibility and spontaneity.' },
  ] },
];
