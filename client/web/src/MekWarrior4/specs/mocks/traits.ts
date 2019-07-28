import { Trait, TraitBase } from "../../traits";

const mechwarriorPhenotype = new Trait(new TraitBase({
  name: 'Phenotype',
  multipleAllowed: false,
}));

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

export const mockTraits = {
  animalEmpathy,
  greenThumb,
  royalty,
  mechwarriorPhenotype,
  naturalAptitude,
};
