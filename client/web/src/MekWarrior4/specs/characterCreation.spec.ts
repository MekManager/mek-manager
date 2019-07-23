import { expect } from 'chai';
import 'mocha';
import { CharacterCreationHarness } from '../characterCreationHarness';
import { mockAffiliations } from './mocks/affiliations';
import { mockLifeModules } from './mocks/lifeModules';
import { mockTraits } from './mocks/traits';

/* TODO: These tests are ugly and very "square". Right now I'm ok with this
 * because I'm really just trying to spike this all out. But these should not
 * be left like this.
 */
describe("Character Creation", () => {

  it("should not allow taking stage 4 modules as stage 2 if child labor is illegal", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.default);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.civilianJob);

    expect(harness.validate()).to.equal(false);
  });

  it("should not allow taking the same affiliation twice", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.default);
    harness.addAffiliation(mockAffiliations.default);

    expect(harness.modules().length).to.equal(1);
  });

  it("should allow taking stage 4 modules as stage 2 if child labor is legal", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.childLabor);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.civilianJob);

    expect(harness.validate()).to.equal(true);
  });

  it("should not allow taking Clan modules for a non-Clan character", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.default);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.freebornSibko);

    expect(harness.validate()).to.equal(false);
  });

  it("should allow Clan characters to take Clan modules", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.clan);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.freebornSibko);

    expect(harness.validate()).to.equal(true);
  });

  it("should allow hybrid IS/Clan affiliations to take Clan modules", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.sphereClanHybrid);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.freebornSibko);

    expect(harness.validate()).to.equal(true);
  });

  it("should not allow hybrid IS/Clan affiliations to use trueborn restricted modules", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.sphereClanHybrid);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.truebornSibko);

    expect(harness.validate()).to.equal(false);
  });

  it("should allow Trueborn Clan warriors to use Trueborn restricted modules", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.clan);
    harness.addTrait(mockTraits.mechwarriorPhenotype);
    harness.addModule(1, mockLifeModules.truebornCreche);
    harness.addModule(2, mockLifeModules.truebornSibko);

    expect(harness.validate()).to.equal(true);
  });
});
