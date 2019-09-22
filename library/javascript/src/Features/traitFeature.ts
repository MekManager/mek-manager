import { expect } from 'chai';
import { Given , Then, When } from 'cucumber';
import { Trait } from '../MekWarrior4';
import { stringToTrait } from './TestData/traits';

const world: { trait?: Trait; } = {};

Given('a {string} trait', (trait: string) => {
  world.trait = stringToTrait(trait);
});

When('{int} XP is added to the trait', (xp: number) => {
  world.trait.setXP(xp);
});

When('the sub-description is set to {string}', (desc: string) => {
  if (desc.trim() !== '') {
    world.trait.subDescription = desc;
  }
});

When('the subject is set to {string}', (subject: string) => {
  if (subject.trim() !== '') {
    world.trait.subject = subject;
  }
});

Then('it should have {int} trait points', (points: number) => {
  expect(world.trait.level).to.equal(points);
});

Then(`it's active state should be {string}`, (bool: string) => {
  const state = bool === 'true';
  expect(world.trait.isActive).to.equal(state);
});

Then('the string value should be {string}', (str: string) => {
  expect(world.trait.toString()).to.equal(str);
});
