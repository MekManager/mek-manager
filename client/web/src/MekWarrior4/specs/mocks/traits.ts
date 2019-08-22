import { Trait, TraitBase } from '../../traits';

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
  aerospacePhenotype,
  animalEmpathy,
  elementalPhenotype,
  greenThumb,
  rank,
  royalty,
  mekwarriorPhenotype,
  naturalAptitude,
  title,
};
