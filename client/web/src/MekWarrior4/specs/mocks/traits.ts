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


export const mockTraits = {
  royalty,
  mechwarriorPhenotype,
};
