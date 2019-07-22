import { LifeModule } from '../../lifeModule';
import { LifeStage } from '../../lifeStage';
import { Rule } from '../../specialRules';

const defaultAffiliation = new LifeModule(
  LifeStage.AFFILIATION,
  'standard place',
  []
);

const legalChildLabor = new LifeModule(
  LifeStage.AFFILIATION,
  'Not a very fun place',
  [ Rule.LEGAL_CHILD_LABOR ]
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
  [ Rule.ACTS_AS_CLAN ],
  false // Being explicit here because it's the point
);

export const mockAffiliations = {
  childLabor: legalChildLabor,
  clan,
  default: defaultAffiliation,
  sphereClanHybrid,
};
