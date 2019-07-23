import { LifeModule } from '../../lifeModule';
import { LifeStage } from '../../lifeStage';
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
  [ mockRules.legalChildLabor ]
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

export const mockAffiliations = {
  cantBeOnly,
  childLabor: legalChildLabor,
  clan,
  default: defaultAffiliation,
  sphereClanHybrid,
};
