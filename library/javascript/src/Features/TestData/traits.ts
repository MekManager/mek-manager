import { Trait, TraitBase } from '../../MekWarrior4';

export const stringToTrait = (which: string): Trait => {
  switch (which) {
    case 'capped':
      return cappedTrait;
    case 'cool':
      return coolTrait;
    case 'minimum':
      return minimumTrait;
    default:
      return minimalTrait;
  }
};

export const minimalBase = new TraitBase({
  name: 'test',
  multipleAllowed: false,
});
export const minimalTrait = new Trait(minimalBase);

export const cappedTraitBase = new TraitBase({
  name: 'test',
  multipleAllowed: false,
  max: 5,
});
export const cappedTrait = new Trait(cappedTraitBase);

export const minimumBase = new TraitBase({
  name: 'test',
  multipleAllowed: false,
  min: 2,
});
export const minimumTrait = new Trait(minimumBase);

export const coolTrait = new Trait(new TraitBase({ name: 'Coolness' }));
