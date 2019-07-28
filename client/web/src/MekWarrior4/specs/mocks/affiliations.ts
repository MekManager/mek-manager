import { LifeModule } from '../../lifeModule';
import { LifeStage, lifeStageName } from '../../lifeStage';
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
  [ mockRules.forcedToFarmUnlessRoyal ]
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

export const mockAffiliations = {
  cantBeOnly,
  childLabor: legalChildLabor,
  clan,
  default: defaultAffiliation,
  eliteFarmer,
  minimumAttrPlace,
  minimumAttrAffiliationPlace,
  noFarm,
  royalSnob,
  sphereClanHybrid,
};
