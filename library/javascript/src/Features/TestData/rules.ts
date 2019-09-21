import { Attribute, LifeStage, Rule, RuleName } from '../../MekWarrior4';


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
  }
);
const traitRequiresAttributeScore = new Rule(
  RuleName.MINIMUM_ATTRIBUTE_SCORE_FOR_TRAIT,
  {
    trait: 'Natural Aptitude',
    attribute: Attribute.INT,
    score: 4,
  }
);
const traitRequiresAttributeScoreForStage = new Rule(
  RuleName.MINIMUM_ATTRIBUTE_SCORE_FOR_TRAIT_IN_STAGE,
  {
    trait: 'Natural Aptitude',
    attribute: Attribute.INT,
    score: 4,
    stage: LifeStage.AFFILIATION,
  }
);
const linkedTraits = new Rule(
  RuleName.TRAIT_MUST_HAVE_OTHER_TRAIT,
  {
    trait: 'Green Thumb',
    requiredTrait: 'Animal Empathy',
  }
);
const noGreenThumb = new Rule(
  RuleName.TRAIT_NOT_ALLOWED,
  {
    trait: 'Green Thumb',
  }
);
const noHigherEducation = new Rule(
  RuleName.MUST_SKIP_STAGE,
  {
    stage: LifeStage.HIGHER_EDUCATION,
  }
);
const apprenticeShipOnly = new Rule(
  RuleName.ONLY_ONE_MODULE_ALLOWED_FOR_STAGE,
  {
    stage: LifeStage.HIGHER_EDUCATION,
    module: 'Trade School',
  }
);
const rankRestrictedByTrait = new Rule(
  RuleName.TRAIT_CANT_GO_HIGHER_THAN_OTHER,
  {
    trait: 'Rank',
    restrictingTrait: 'Title',
  }
);
const noMekOrBattleArmor = new Rule(RuleName.NO_MECHWARRIORS_OR_BATTLEARMOR);
const noMekTraitingWithoutTitle = new Rule(
  RuleName.NO_SKILLS_FROM_FIELD_WITHOUT_TRAIT,
  {
    trait: 'Title',
    field: 'MekWarrior',
  }
);
const mustUseOtherPhenotype = new Rule(
  RuleName.CLAN_MUST_USE_OTHER_PHENOTYPE,
  {
    phenotype: 'MekWarrior',
    restrictedPhenotype: 'Aerospace',
  }
);
const clanWarriorMustTakeTrait = new Rule(
  RuleName.CLAN_WARRIOR_MUST_TAKE_TRAIT,
  {
    trait: 'Natural Aptitude',
  }
);

export const mockRules = {
  actsAsClan,
  apprenticeShipOnly,
  cannotBeOnlyAffiliation,
  clanWarriorMustTakeTrait,
  forcedToFarmUnlessRoyal,
  legalChildLabor,
  linkedTraits,
  mustUseOtherPhenotype,
  noFarm,
  noGreenThumb,
  noHigherEducation,
  noMekOrBattleArmor,
  noMekTraitingWithoutTitle,
  rankRestrictedByTrait,
  traitRequiresAttributeScore,
  traitRequiresAttributeScoreForStage,
  truebornOnly,
};
