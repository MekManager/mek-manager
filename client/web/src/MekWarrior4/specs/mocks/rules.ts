import { Attribute } from '../../attributes';
import { LifeStage } from '../../lifeStage';
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
const traitRequiresAttributeScore = new Rule(
  RuleName.MINIMUM_ATTRIBUTE_SCORE_FOR_TRAIT,
  {
    trait: 'Natural Aptitude',
    attribute: Attribute.INT,
    score: 4,
  });
const traitRequiresAttributeScoreForStage = new Rule(
  RuleName.MINIMUM_ATTRIBUTE_SCORE_FOR_TRAIT_IN_STAGE,
  {
    trait: 'Natural Aptitude',
    attribute: Attribute.INT,
    score: 4,
    stage: LifeStage.AFFILIATION,
  });
const linkedTraits = new Rule(
  RuleName.TRAIT_MUST_HAVE_OTHER_TRAIT,
  {
    mainTrait: 'Green Thumb',
    requiredTrait: 'Animal Empathy',
  });
const noGreenThumb = new Rule(
  RuleName.TRAIT_NOT_ALLOWED,
  {
    trait: 'Green Thumb',
  });

export const mockRules = {
  actsAsClan,
  cannotBeOnlyAffiliation,
  forcedToFarmUnlessRoyal,
  legalChildLabor,
  linkedTraits,
  noFarm,
  noGreenThumb,
  traitRequiresAttributeScore,
  traitRequiresAttributeScoreForStage,
  truebornOnly,
};
