import { LifeModule, LifeStage } from '../../MekWarrior4';
import { mockRules } from './rules';

const defaultAffiliation = new LifeModule(
  LifeStage.AFFILIATION,
  'standard place',
  []
);

const cantBeOnly = new LifeModule(
  LifeStage.AFFILIATION,
  'lonely place',
  [ mockRules.cannotBeOnlyAffiliation ]
);

const legalChildLabor = new LifeModule(
  LifeStage.AFFILIATION,
  'Not a very fun place',
  [ mockRules.legalChildLabor, mockRules.noHigherEducation ]
);

const clan = new LifeModule(
  LifeStage.AFFILIATION,
  'A Clan',
  [],
  true
);

const sphereClanHybrid = new LifeModule(
  LifeStage.AFFILIATION,
  'Hybrid Clan/Sphere',
  [ mockRules.actsAsClan ],
  false // Being explicit here because it's the point
);

const noFarm = new LifeModule(
  LifeStage.AFFILIATION,
  'NO FARMS!',
  [ mockRules.noFarm, mockRules.noGreenThumb ]
);

const royalSnob = new LifeModule(
  LifeStage.AFFILIATION,
  'Royal Snob',
  [
    mockRules.forcedToFarmUnlessRoyal,
    mockRules.rankRestrictedByTrait,
    mockRules.noMekTraitingWithoutTitle,
  ]
);

const minimumAttrPlace = new LifeModule(
  LifeStage.AFFILIATION,
  'Top Performers Club',
  [ mockRules.traitRequiresAttributeScore ]
);

const minimumAttrAffiliationPlace = new LifeModule(
  LifeStage.AFFILIATION,
  'Early Life Top Performers Club',
  [ mockRules.traitRequiresAttributeScoreForStage ]
);

const eliteFarmer = new LifeModule(
  LifeStage.AFFILIATION,
  'Elite Farmer',
  [ mockRules.linkedTraits, mockRules.apprenticeShipOnly ]
);

const deepPeriphery = new LifeModule(
  LifeStage.AFFILIATION,
  'Deep Periphery',
  [ mockRules.noMekOrBattleArmor ]
);

const bigBoyClan = new LifeModule(
  LifeStage.AFFILIATION,
  'Clan BigBoy',
  [ mockRules.mustUseOtherPhenotype ],
  true
);

const topTierClan = new LifeModule(
  LifeStage.AFFILIATION,
  'Clan TopTier',
  [ mockRules.clanWarriorMustTakeTrait ],
  true
);

// TODO: Figure out what this was for. Some Clan testing it looks like
const topTierAssociate = new LifeModule(
  LifeStage.AFFILIATION,
  'TopTier Associate',
  [ mockRules.clanWarriorMustTakeTrait, mockRules.actsAsClan ]
);

export const mockAffiliations = {
  "Can't Be Only": cantBeOnly,
  'Big Boy Clan': bigBoyClan,
  'Child Labor': legalChildLabor,
  'Clan': clan,
  'Deep Periphery': deepPeriphery,
  'Default': defaultAffiliation,
  'Elite Farmer': eliteFarmer,
  'Minimum Attr for Affiliation': minimumAttrAffiliationPlace,
  'Minimum Attrs': minimumAttrPlace,
  'No Farm': noFarm,
  'Royal Snob': royalSnob,
  'Sphere/Clan Hybrid': sphereClanHybrid,
  'Top Tier Clan': topTierClan,
};
