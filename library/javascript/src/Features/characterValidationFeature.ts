import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import {
  Attribute,
  CharacterCreationHarness,
  ClanCaste,
  LifeModule,
  LifeStage,
  Trait
} from '../MekWarrior4';
import { mockAffiliations } from './TestData/affiliations';
import { mockLifeModules } from './TestData/lifeModules';
import { mockTraits } from './TestData/traits';

const world: { harness?: CharacterCreationHarness } = {};


Given('a new character', () => {
  world.harness = new CharacterCreationHarness();
});


When('the character takes the affiliation: {string}', (affil: string) => {
  const affiliation: LifeModule = mockAffiliations[affil];
  expect(affiliation).not.to.be.undefined;

  world.harness.addAffiliation(affiliation);
});

When(
  /^the character takes the module \"(.*)\" for stage (\d+)\s?(?:focusing on the \"(.*)\" field)?/,
  (modStr: string, stage: number, field?: string) => {
    const mod: LifeModule = mockLifeModules[modStr];
    expect(mod).not.to.be.undefined;

    if (field !== undefined) {
      world.harness.addModule(stage, mod, field);
    } else {
      world.harness.addModule(stage, mod);
    }
  }
);

When('the character takes the caste: {string}', (caste: string) => {
  // The enum values are strings at the end of the day, and we can just assume
  // the tests are passing the correct values.
  world.harness.addCaste(caste as ClanCaste);
});

When(
  /^the character takes the trait: \"(.*)\"(?: during stage (\d+))?(?: with (\d+) XP)?/,
  (traitStr: string, stage?: number, xp?: number) => {
    const trait: Trait = mockTraits[traitStr];
    expect(trait).not.to.be.undefined;

    if (stage !== undefined) {
      trait.stageTaken = stage as LifeStage;
    }

    if (xp !== undefined) {
      trait.setXP(xp);
    }

    world.harness.addTrait(trait);
  }
);

When('the character adds {int} XP to their {string} attribute', (xp: number, attr: string) => {
  world.harness.alterAttributeXP(attr as Attribute, xp);
});


Then('the character should have {int} affiliation', (count: number) => {
  expect(world.harness.modules().length).to.equal(count);
});

Then('the character should be {string}', (validStr: string) => {
  const valid = validStr === 'Valid';

  expect(world.harness.validate()).to.equal(
    valid,
    world.harness.errors.map(e => e.message).join('\n')
  );
});
