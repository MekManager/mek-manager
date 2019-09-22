import { expect } from 'chai';
import { Given , Then, When } from 'cucumber';
import {
  Attribute,
  Attributes,
  AttributeValues,
} from '../MekWarrior4';

const world: {
  attributeSet?: Attributes;
  attributeSetTwo?: Attributes;
} = {
  attributeSet: undefined,
  attributeSetTwo: undefined,
};

const emptyValues: AttributeValues = {
  xp: 0,
  score: 0,
  link: -4,
};

Given('a new set of attributes', () => {
  world.attributeSet = new Attributes();
});

Then(`each attribute should equal it's base value`, () => {
  const attrs = world.attributeSet;

  expect(attrs.getValues(Attribute.STR)).to.deep.equal(emptyValues);
  expect(attrs.getValues(Attribute.BOD)).to.deep.equal(emptyValues);
  expect(attrs.getValues(Attribute.RFL)).to.deep.equal(emptyValues);
  expect(attrs.getValues(Attribute.DEX)).to.deep.equal(emptyValues);
  expect(attrs.getValues(Attribute.INT)).to.deep.equal(emptyValues);
  expect(attrs.getValues(Attribute.WIL)).to.deep.equal(emptyValues);
  expect(attrs.getValues(Attribute.CHA)).to.deep.equal(emptyValues);
  expect(attrs.getValues(Attribute.EDG)).to.deep.equal(emptyValues);
});

When(`it has {int} XP added to it's {string} attribute`, (xp: number, attr: Attribute) => {
  world.attributeSet.addXP(attr, xp);
});

When('a second set of attributes is constructed with it', () => {
  world.attributeSetTwo = new Attributes(world.attributeSet);
});

When(`the second has {int} XP added to it's {string} attribute`, (xp: number, attr: Attribute) => {
  world.attributeSetTwo.addXP(attr, xp);
});

Then('they should not be equal', () => {
  expect(world.attributeSetTwo).not.to.equal(world.attributeSet);
});

Then(`the first's has base values for {string}`, (attr: Attribute) => {
  expect(world.attributeSet.getValues(attr)).to.deep.equal(emptyValues);
});

Then(`the second's {string} should equal the first`, (attr: Attribute) => {
  const setOne = world.attributeSet.getValues(attr);
  const setTwo = world.attributeSetTwo.getValues(attr);
  expect(setOne).to.deep.equal(setTwo);
});

Then(`it's score should be {int}`, (score: number) => {
  expect(world.attributeSet.getValues(Attribute.STR).score).to.equal(score);
});

Then(`it's link value should be {int}`, (link: number) => {
  expect(world.attributeSet.getValues(Attribute.STR).link).to.equal(link);
});
