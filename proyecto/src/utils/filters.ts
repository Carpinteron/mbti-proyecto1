import { DIMENSIONS } from '../constants/dimensions';
import type { Group, PersonalityType } from '../types';
import { getGroup } from './groups';

/** Keeps only valid pole letters, at most one per dimension, in dimension order (e.g. "ne" becomes "EN"). */
export function parseDims(value: string | null): string {
  const letters = (value ?? '').toUpperCase();
  return DIMENSIONS.map((dimension) => dimension.poles.find((pole) => letters.includes(pole.letter))?.letter ?? '').join('');
}

/** Does this MBTI code have every selected letter in the right position (E/I, S/N, T/F, J/P)? */
export function matchesDims(code: string, dims: string): boolean {
  return DIMENSIONS.every((dimension, index) => {
    const wanted = dims.split('').find((letter) => dimension.poles.some((pole) => pole.letter === letter));
    return !wanted || code[index]?.toUpperCase() === wanted;
  });
}

/** Number of personalities per group, plus the total under `all`. */
export function countByGroup(types: PersonalityType[]): Record<Group, number> {
  return types.reduce<Record<Group, number>>(
    (result, type) => {
      result.all += 1;
      result[getGroup(type.code)] += 1;
      return result;
    },
    { all: 0, analysts: 0, diplomats: 0, explorers: 0, sentinels: 0 },
  );
}
