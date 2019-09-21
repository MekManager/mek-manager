import { LifeModule } from '../../MekWarrior4';
import { mockRules } from './rules';

const farm = new LifeModule(1, 'Farm', []);
const nobility = new LifeModule(1, 'Nobility', []);
const truebornCreche = new LifeModule(1, 'Trueborn Creche', [ mockRules.truebornOnly ], true);

const freebornSibko = new LifeModule(2, 'Freeborn Sibko', [], true);
const truebornSibko = new LifeModule(2, 'Trueborn Sibko', [ mockRules.truebornOnly ], true);
const backwoods = new LifeModule(2, 'Back Woods', []);
const militarySchool = new LifeModule(2, 'Military School', []);

const tradeSchool = new LifeModule(3, 'Trade School', []);
const militaryAcademy = new LifeModule(3, 'Military Academy', []);

const civilianJob = new LifeModule(4, 'Civilian Job', []);

export const mockLifeModules = {
  'Backwoods': backwoods,
  'Civilian Job': civilianJob,
  'Farm': farm,
  'Freeborn Sibko': freebornSibko,
  'Military Academy': militaryAcademy,
  'Military School': militarySchool,
  'Nobility': nobility,
  'Trade School': tradeSchool,
  'Trueborn Creche': truebornCreche,
  'Trueborn Sibko': truebornSibko,
};
