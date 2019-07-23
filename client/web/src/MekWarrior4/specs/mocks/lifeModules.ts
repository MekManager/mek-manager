import { LifeModule } from '../../lifeModule';
import { mockRules } from './rules';

const farm = new LifeModule(1, 'Farm', []);
const freebornSibko = new LifeModule(2, 'Freeborn Sibko', [], true);
const truebornCreche = new LifeModule(1, 'Trueborn Creche', [ mockRules.truebornOnly ], true);
const truebornSibko = new LifeModule(2, 'Trueborn Sibko', [ mockRules.truebornOnly ], true);
const civilianJob = new LifeModule(4, 'Civilian Job', []);

export const mockLifeModules = {
  civilianJob,
  farm,
  freebornSibko,
  truebornCreche,
  truebornSibko,
};
