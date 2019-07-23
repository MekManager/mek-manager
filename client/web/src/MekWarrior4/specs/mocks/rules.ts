import { Rule, RuleName } from '../../rule';

const truebornOnly = new Rule(RuleName.TRUEBORN_ONLY);
const cannotBeOnlyAffiliation = new Rule(RuleName.CANNOT_BE_ONLY_AFFILIATION);
const legalChildLabor = new Rule(RuleName.LEGAL_CHILD_LABOR);
const actsAsClan = new Rule(RuleName.ACTS_AS_CLAN);

export const mockRules = {
  actsAsClan,
  cannotBeOnlyAffiliation,
  legalChildLabor,
  truebornOnly,
};
