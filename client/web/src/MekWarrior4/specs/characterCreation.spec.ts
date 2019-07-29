import { expect } from 'chai';
import 'mocha';
import { Attribute } from '../attributes';
import { CharacterCreationHarness } from '../characterCreationHarness';
import { LifeStage } from '../lifeStage';
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

  it("should be invalid if the only affiliation cannot be the sole affiliation", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.cantBeOnly);

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if a non-single affiliation is not the sole affiliation", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.cantBeOnly);
    harness.addAffiliation(mockAffiliations.default);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if it's taken an affiliation restricted by another", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.noFarm);
    harness.addModule(1, mockLifeModules.farm);

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if a restricted module is not present", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.noFarm);
    harness.addModule(1, mockLifeModules.nobility);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if the character lacks a required trait, and is not on the restricted path", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    // missing the "Royalty" trait here
    harness.addModule(1, mockLifeModules.nobility);

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if the character lacks the required trait, but is on the restricted path", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    harness.addModule(1, mockLifeModules.farm);

    expect(harness.validate()).to.equal(true);
  });

  it("should be valid if the character has the required trait", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    harness.addTrait(mockTraits.royalty);
    harness.addModule(1, mockLifeModules.nobility);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if the character doesn't have the appropriate attribute score", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.minimumAttrPlace);
    harness.addTrait(mockTraits.naturalAptitude);

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if the character has the trait, and the attribute score is high enough", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.minimumAttrPlace);
    harness.addTrait(mockTraits.naturalAptitude);
    harness.alterAttributeXP(Attribute.INT, 400);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if the character has the trait in the required stage, and doesn't have a high enough attribute score", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.minimumAttrAffiliationPlace);
    const trait = mockTraits.naturalAptitude;
    trait.stageTaken = LifeStage.AFFILIATION;
    harness.addTrait(trait);

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if the character has the trait in the required stage, and has a high enough attribute score", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.minimumAttrAffiliationPlace);
    const trait = mockTraits.naturalAptitude;
    trait.stageTaken = LifeStage.AFFILIATION;
    harness.addTrait(trait);
    harness.alterAttributeXP(Attribute.INT, 400);

    expect(harness.validate()).to.equal(true);
  });

  it("should be valid if the character has the trait in a different stage, and doesn't have a high enough attribute score", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.minimumAttrAffiliationPlace);
    const trait = mockTraits.naturalAptitude;
    trait.stageTaken = LifeStage.LATE_CHILDHOOD;
    harness.addTrait(trait);

    expect(harness.validate()).to.equal(true);
  });

  it("should be valid if the main trait hasn't been taken", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.eliteFarmer);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if the second required trait is missing", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.eliteFarmer);
    harness.addTrait(mockTraits.greenThumb);

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if the main trait has it's required trait", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.eliteFarmer);
    harness.addTrait(mockTraits.greenThumb);
    harness.addTrait(mockTraits.animalEmpathy);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if the trait that's not allowed is present", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.noFarm);
    harness.addTrait(mockTraits.greenThumb);

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if the trait that's not allowed has not been taken", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.noFarm);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if the character has taken a module for the restricted stage", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.childLabor);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.backwoods);
    harness.addModule(3, mockLifeModules.tradeSchool);

    expect(harness.validate()).to.equal(false);
  });

  it("should be invalid if any module is taken for the stage other than the exception", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.eliteFarmer);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.backwoods);
    harness.addModule(3, mockLifeModules.militaryAcademy);

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if the character has taken the one exception for the restricted stage", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.eliteFarmer);
    harness.addModule(1, mockLifeModules.farm);
    harness.addModule(2, mockLifeModules.backwoods);
    harness.addModule(3, mockLifeModules.tradeSchool);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if the character has taken Mek training", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.deepPeriphery);
    harness.addModule(1, mockLifeModules.nobility);
    harness.addModule(2, mockLifeModules.militarySchool);
    harness.addModule(3, mockLifeModules.militaryAcademy, 'MekWarrior');

    expect(harness.validate()).to.equal(false);
  });
  it("should be invalid if the character has taken Battle Armor training", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.deepPeriphery);
    harness.addModule(1, mockLifeModules.nobility);
    harness.addModule(2, mockLifeModules.militarySchool);
    harness.addModule(3, mockLifeModules.militaryAcademy, 'Battle Armor');

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if the character has not taken either Mek or Battle Armor training", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.deepPeriphery);
    harness.addModule(1, mockLifeModules.nobility);
    harness.addModule(2, mockLifeModules.militarySchool);
    harness.addModule(3, mockLifeModules.militaryAcademy, 'Tank');

    expect(harness.validate()).to.equal(true);
  });

  it("should be valid if the character has changed to an affiliation without the restriction", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.deepPeriphery);
    harness.addAffiliation(mockAffiliations.default);
    harness.addModule(1, mockLifeModules.nobility);
    harness.addModule(2, mockLifeModules.militarySchool);
    harness.addModule(3, mockLifeModules.militaryAcademy, 'MekWarrior');

    expect(harness.validate()).to.equal(true);
  });

  it("should be valid if neither of the traits are present", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);

    expect(harness.validate()).to.equal(true);
  });

  it("should be valid if only the restricting trait is present", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    const title = mockTraits.title;
    title.setXP(200);
    harness.addTrait(title);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if only the restricted trait is present", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    const rank = mockTraits.rank;
    rank.setXP(200);
    harness.addTrait(rank);

    expect(harness.validate()).to.equal(false);
  });

  it("should be invalid if the restricted trait has a higher level than the restricted trait", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    const title = mockTraits.title;
    title.setXP(100);
    const rank = mockTraits.rank;
    rank.setXP(200);
    harness.addTrait(title);
    harness.addTrait(rank);

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if the restricted trait has an equal level to the restricted trait", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    const title = mockTraits.title;
    title.setXP(200);
    const rank = mockTraits.rank;
    rank.setXP(200);
    harness.addTrait(title);
    harness.addTrait(rank);

    expect(harness.validate()).to.equal(true);
  });

  it("should be valid if the restricted trait has an lesser level to the restricted trait", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    const title = mockTraits.title;
    title.setXP(400);
    const rank = mockTraits.rank;
    rank.setXP(200);
    harness.addTrait(title);
    harness.addTrait(rank);

    expect(harness.validate()).to.equal(true);
  });

  it("should be invalid if the character has the field, but not the trait", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    harness.addTrait(mockTraits.royalty);
    harness.addModule(1, mockLifeModules.nobility);
    harness.addModule(2, mockLifeModules.militarySchool);
    harness.addModule(3, mockLifeModules.militaryAcademy, 'MekWarrior');

    expect(harness.validate()).to.equal(false);
  });

  it("should be valid if the character has neither the trait nor the field", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    harness.addTrait(mockTraits.royalty);
    harness.addModule(1, mockLifeModules.nobility);
    harness.addModule(2, mockLifeModules.militarySchool);
    harness.addModule(3, mockLifeModules.militaryAcademy, 'AeroSpace');

    expect(harness.validate()).to.equal(true);
  });

  it("should be valid if the character has the trait but not the field", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    harness.addTrait(mockTraits.royalty);
    const title = mockTraits.title;
    title.setXP(400);
    harness.addTrait(title);
    harness.addModule(1, mockLifeModules.nobility);
    harness.addModule(2, mockLifeModules.militarySchool);
    harness.addModule(3, mockLifeModules.militaryAcademy, 'AeroSpace');

    expect(harness.validate()).to.equal(true);
  });

  it("should be valid if the character has both the trait and the field", () => {
    const harness = new CharacterCreationHarness();
    harness.addAffiliation(mockAffiliations.royalSnob);
    harness.addTrait(mockTraits.royalty);
    const title = mockTraits.title;
    title.setXP(400);
    harness.addTrait(title);
    harness.addModule(1, mockLifeModules.nobility);
    harness.addModule(2, mockLifeModules.militarySchool);
    harness.addModule(3, mockLifeModules.militaryAcademy, 'MekWarrior');

    expect(harness.validate()).to.equal(true);
  });
});
