import { expect } from 'chai';
import { Given , Then, When } from 'cucumber';
import {
  Attribute,
  Attributes,
  changeXP,
  emptyAttributeValues,
  newAttributes
} from '../MekWarrior4';

const world: {
  attributeSet?: Attributes;
  attributeSetTwo?: Attributes;
} = {
  attributeSet: undefined,
  attributeSetTwo: undefined,
};

Given('a new set of attributes', () => {
  world.attributeSet = newAttributes();
});

Then(`each attribute should equal it's base value`, () => {
  const attrs = world.attributeSet;
  const emptyValues = emptyAttributeValues();
  expect(attrs.get(Attribute.STR)).to.deep.equal(emptyValues);
  expect(attrs.get(Attribute.BOD)).to.deep.equal(emptyValues);
  expect(attrs.get(Attribute.RFL)).to.deep.equal(emptyValues);
  expect(attrs.get(Attribute.DEX)).to.deep.equal(emptyValues);
  expect(attrs.get(Attribute.INT)).to.deep.equal(emptyValues);
  expect(attrs.get(Attribute.WIL)).to.deep.equal(emptyValues);
  expect(attrs.get(Attribute.CHA)).to.deep.equal(emptyValues);
  expect(attrs.get(Attribute.EDG)).to.deep.equal(emptyValues);
});

When(`it has {int} XP added to it's {string} attribute`, (xp: number, attr: Attribute) => {
  world.attributeSet = changeXP(world.attributeSet, attr, xp);
});

When('a second set of attributes is constructed with it', () => {
  world.attributeSetTwo = newAttributes(world.attributeSet);
});

When(`the second has {int} XP added to it's {string} attribute`, (xp: number, attr: Attribute) => {
  world.attributeSetTwo = changeXP(world.attributeSetTwo, attr, xp);
});

Then('they should not be equal', () => {
  expect(world.attributeSetTwo).not.to.equal(world.attributeSet);
});

Then(`the first's has base values for {string}`, (attr: Attribute) => {
  expect(world.attributeSet.get(attr)).to.deep.equal(emptyAttributeValues());
});

Then(`the second's {string} should equal the first`, (attr: Attribute) => {
  const setOne = world.attributeSet.get(attr);
  const setTwo = world.attributeSetTwo.get(attr);
  expect(setOne).to.deep.equal(setTwo);
});

Then(`it's score should be {int}`, (score: number) => {
  // NOTE: I find out it's strength, rather than imply it
  expect(world.attributeSet.get(Attribute.STR).score).to.equal(score);
});

Then(`it's link value should be {int}`, (link: number) => {
  // NOTE: I find out it's strength, rather than imply it
  expect(world.attributeSet.get(Attribute.STR).link).to.equal(link);
});
