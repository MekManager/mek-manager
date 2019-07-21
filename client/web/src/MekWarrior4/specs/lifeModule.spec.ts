import { expect } from "chai";
import "mocha";
import { Affiliation } from '../affiliation';
import { CharacterCreationHarness } from '../characterCreationHarness';
import { Character } from '../characters';
import { LifeModule } from '../lifeModule';
import { mockAffiliations } from './mocks/affiliations';
import { mockLifeModules } from './mocks/lifeModules';

// NOTE: Affiliations are a special type of Life Module
describe("Affiliations", () => {

  it("should not allow taking stage 4 modules as stage 2 if child labor is illegal", () => {
      const harness = new CharacterCreationHarness();
      harness.addAffiliation(mockAffiliations.default);
      harness.addModule(1, mockLifeModules.farm);
      harness.addModule(2, mockLifeModules.civilianJob);
      harness.validate();

      expect(harness.valid()).to.equal(false);
    });

  it("should allow taking stage 4 modules as stage 2 if child labor is legal", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.childLabor);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.civilianJob);
    harness.validate();

    expect(harness.valid()).to.equal(true);
  });
});
