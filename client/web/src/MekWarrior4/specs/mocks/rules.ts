import { Rule, RuleName } from '../../rule';

const truebornOnly = new Rule(RuleName.TRUEBORN_ONLY);
const cannotBeOnlyAffiliation = new Rule(RuleName.CANNOT_BE_ONLY_AFFILIATION);
const legalChildLabor = new Rule(RuleName.LEGAL_CHILD_LABOR);
const actsAsClan = new Rule(RuleName.ACTS_AS_CLAN);
const noFarm = new Rule(RuleName.CANT_HAVE_MODULE, { name: 'Farm' });
const forcedToFarmUnlessRoyal = new Rule(
  RuleName.FORCED_PATH_WITHOUT_TRAIT,
  {
    trait: 'Royalty',
    stage: 1,
    module: 'Farm',
  });

export const mockRules = {
  actsAsClan,
  cannotBeOnlyAffiliation,
  forcedToFarmUnlessRoyal,
  legalChildLabor,
  noFarm,
  truebornOnly,
};
