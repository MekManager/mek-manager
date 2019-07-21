import { Affiliation } from "../../affiliation";

const defaultAffiliation = new Affiliation({
  name: 'standard place',
  specialRules: {},
});
const legalChildLabor = new Affiliation({
  name: 'A not very fun place',
  specialRules: {
    childLabor: true,
  },
});

export const mockAffiliations = {
    default: defaultAffiliation,
    childLabor: legalChildLabor,
};
