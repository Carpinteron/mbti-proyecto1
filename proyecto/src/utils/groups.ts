export type GroupKey = 'analysts' | 'diplomats' | 'sentinels' | 'explorers';

export const GROUP_KEYS: GroupKey[] = ['analysts', 'diplomats', 'sentinels', 'explorers'];

export const GROUP_LABELS: Record<GroupKey, string> = {
  analysts: 'Analysts',
  diplomats: 'Diplomats',
  sentinels: 'Sentinels',
  explorers: 'Explorers',
};

/** NT → Analysts, NF → Diplomats, SJ → Sentinels, SP → Explorers */
export function getGroup(code: string): GroupKey {
  const c = code.toUpperCase();
  if (c[1] === 'N') return c[2] === 'T' ? 'analysts' : 'diplomats';
  return c[3] === 'J' ? 'sentinels' : 'explorers';
}

export function isGroupKey(value: string | null): value is GroupKey {
  return GROUP_KEYS.includes(value as GroupKey);
}

/**
 * Full class names on purpose: Tailwind finds utilities by scanning the source for complete
 * strings, so `tone-${group}` would never be generated.
 */
export const TONE_CLASS: Record<GroupKey, string> = {
  analysts: 'tone-analysts',
  diplomats: 'tone-diplomats',
  sentinels: 'tone-sentinels',
  explorers: 'tone-explorers',
};
