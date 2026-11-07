import type { PersonalityProfile, PersonalityType } from '../types';

const API_BASE = 'https://personality.fyi/api/v1';

async function request<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, { signal });
  if (!res.ok) throw new Error(`Personality.fyi request failed (${res.status}).`);
  return res.json() as Promise<T>;
}

export async function fetchTypes(signal?: AbortSignal): Promise<PersonalityType[]> {
  const data = await request<{ types: PersonalityType[] }>('/types', signal);
  return data.types;
}

export function fetchType(code: string, signal?: AbortSignal): Promise<PersonalityProfile> {
  return request<PersonalityProfile>(`/types/${encodeURIComponent(code.toUpperCase())}`, signal);
}
