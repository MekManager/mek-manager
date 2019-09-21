import { Trait, TraitBase } from '../../MekWarrior4';

// TODO: this should be an object
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

// NOTE: Everything below here was originally part of the Character creation
// testing files.

// TODO: Need to find a better way to create traits.
const mekwarriorPhenotype = (() => {
  const trait = new Trait(new TraitBase({
    name: 'Phenotype',
    multipleAllowed: false,
  }));
  trait.subDescription = 'MekWarrior';

  return trait;
})();

const aerospacePhenotype = (() => {
  const trait = new Trait(new TraitBase({
    name: 'Phenotype',
    multipleAllowed: false,
  }));
  trait.subDescription = 'Aerospace';

  return trait;
})();

const elementalPhenotype = (() => {
  const trait = new Trait(new TraitBase({
    name: 'Phenotype',
    multipleAllowed: false,
  }));
  trait.subDescription = 'Elemental';

  return trait;
})();

// Not a real trait, just test data
const royalty = new Trait(new TraitBase({
  name: 'Royalty',
  multipleAllowed: false,
}));

const naturalAptitude = new Trait(new TraitBase({
  name: 'Natural Aptitude',
  multipleAllowed: true,
}));

const greenThumb = new Trait(new TraitBase({
  name: 'Green Thumb',
  multipleAllowed: false,
}));

const animalEmpathy = new Trait(new TraitBase({
  name: 'Animal Empathy',
  multipleAllowed: false,
}));

const rank = new Trait(new TraitBase({
  name: 'Rank',
  multipleAllowed: false,
}));

const title = new Trait(new TraitBase({
  name: 'Title',
  multipleAllowed: false,
}));

export const mockTraits = {
  'MekWarrior Phenotype': mekwarriorPhenotype,
  'Aerospace Phenotype': aerospacePhenotype,
  'Animal Empathy': animalEmpathy,
  'Elemental Phenotype': elementalPhenotype,
  'Green Thumb': greenThumb,
  'Rank': rank,
  'Royalty': royalty,
  'Natural Aptitude': naturalAptitude,
  'Title': title,
};
