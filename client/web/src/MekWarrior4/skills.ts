/* TODO: This file is not coming together as well as the others. Unlike the
 * other interfaces, it's not obvious how to keep the state of an individual
 * skill and the basic information about a skill in one place.
 *
 * Parts of this file that ought to change:
 *  + Code about XP lists and learning levels should be somewhere else
 *  + No clean way to represent the difference between an individual instance
 *    of a Skill, and the Skill data it's based on.
 *    - If something is altered here, that pattern should also be applied to
 *      traits for consistency.
 *  + Learning values need to get passed around *a lot*.
 *    - There might be a possible solution to this with functions that deal
 *      with characters wrapping over these skill functions, so it's not really
 *      seen outside of character functions.
 *  + Have to recalculate current target number, complexity, and link
 *    attributes on every change, and it's not cached.
 *  + There should probably be some kind of type or union representing a
 *    complexity rating.
 *  + Need to use ts-ignore on an import.
 *  + There should be more documentation.
 */
import { findLastIndex, map } from 'ramda';
import { Attribute } from './attributes';

// NOTE: Everything about XP lists and learning should maybe go in it's own file
export const standardXP: number[] = [20, 30, 50, 80, 120, 170, 230, 300, 380, 470, 570];
export const fastXP: number[] = map(x => Math.floor(x * 0.9), standardXP);
export const slowXP: number[] = map(x => Math.floor(x * 1.1), standardXP);

export enum Learning {
  FAST = 'Fast',
  STANDARD = 'Standard',
  SLOW = 'Slow',
}

export const xpList = (l: Learning): number[] => {
  switch (l) {
    case Learning.FAST:
      return fastXP;
    case Learning.STANDARD:
      return standardXP;
    case Learning.SLOW:
      return slowXP;
    default:
      return standardXP;
  }
};

export interface Skill {
  name: string;
  level: number;
  experience: number;
  targetNumbers: [number, number?];
  // NOTE: this might benefit from stricter typing.
  complexityRatings: [string, string?];
  linkedAttributes: [Attribute, [Attribute, Attribute]?];
  tiered: boolean;
  subSkill?: string;
  specialty?: string;
}

const tieredValue = <T>(s: Skill, ts: T[]): T => {
  if (s.tiered) {
    return s.level <= 3 ? ts[0] : ts[1];
  } else {
    return ts[0];
  }
};

export const changeXP = (s: Skill, l: Learning, xp: number): Skill => {
  const experience = s.experience + xp;

  return {
    ...s,
    experience,
    level: levelForXP(l, experience),
  };
};

/**
 * Determines the level of a skill based on XP.
 */
export const levelForXP = (l: Learning, xp: number) =>
  findLastIndex((n: number) => xp >= n, xpList(l));

export const targetNumber = (s: Skill) => {
  return tieredValue<number>(s, s.targetNumbers);
};

export const complexity = (s: Skill) => {
  return tieredValue<string>(s, s.complexityRatings);
};

export const links = (s: Skill) => {
  return tieredValue<Attribute | Attribute[]>(s, s.linkedAttributes);
};

export const toString = (s: Skill) => {
  let str = s.name;
  if (s.subSkill) {
    str = `${str}/${s.subSkill}`;
  }
  if (s.specialty) {
    str = `${str} (${s.specialty})`;
  }

  return str;
};
