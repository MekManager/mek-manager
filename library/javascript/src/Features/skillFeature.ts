import { expect } from 'chai';
import { Given , Then, When } from 'cucumber';
import { Learning, Skill } from '../MekWarrior4';
import { basicSkill, tieredBase, tieredSkill } from './TestData/skills';

const tierToIndex = (tier: string): number => tier === 'one' ? 0 : 1;

const world: { skill?: Skill; learning?: Learning; level?: number; } = {};

Given('a {string} skill', (skill: 'basic' | 'tiered') => {
  world.skill = skill === 'basic' ? basicSkill : tieredSkill;
});

When(`the character's learning is {string}`, (learning: Learning) => {
  world.learning = learning;
});

When('the skill has {int} XP', (xp: number) => {
  world.skill.setXP(xp, world.learning);
  world.level = world.skill.level;
});

When('level is at or below level 3', () => {
  world.skill.setXP(80, Learning.STANDARD);
});

When('level is at or above level 4', () => {
  world.skill.setXP(120, Learning.STANDARD);
});

Then('the skill level should be {int}', (level: number) => {
  expect(world.level).to.equal(level);
});

Then('it should use the tier {string} target number', (tier: string) => {
  const index = tierToIndex(tier);
  expect(world.skill.targetNumber).to.equal(tieredBase.targetNumbers[index]);
});

Then('it should use the tier {string} complexity rating', (tier: string) => {
  const index = tierToIndex(tier);
  expect(world.skill.complexity).to.equal(tieredBase.complexityRatings[index]);
});

Then('it should use the tier {string} linked attributes', (tier: string) => {
  const index = tierToIndex(tier);
  expect(world.skill.links).to.equal(tieredBase.linkedAttributes[index]);
});
