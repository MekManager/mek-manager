import { Trait, TraitBase } from "../../traits";

const mechwarriorPhenotype = new Trait(new TraitBase({
  name: 'Phenotype',
  multipleAllowed: false,
}));

export const mockTraits = {
  mechwarriorPhenotype,
};
