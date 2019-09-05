import { expect } from 'chai';
import 'mocha';
import { Trait, TraitBase } from '../traits';

describe('Traits', () => {
  const traitBase = new TraitBase({
    name: 'test',
    multipleAllowed: false,
  });
  const trait = new Trait(traitBase);

  it('should have a way to create an empty trait', () => {
    expect(trait.base.name).to.exist;
    expect(trait.base.multipleAllowed).to.equal(false);
  });

  describe('Changing XP', () => {
    it('should update the XP and points of a trait', () => {
      trait.setXP(325);

      expect(trait.level).to.equal(3);
      expect(trait.experience).to.equal(325);
    });
  });

  describe('Calculating point values', () => {
    it('should be equal to XP divided by 100, rounded down', () => {
      trait.setXP(200);

      expect(trait.level).to.equal(2);
    });

    it('should clamp the points to the max value, if there is one', () => {
      const localTraitBase = new TraitBase({
        name: 'test',
        multipleAllowed: false,
        max: 5,
      });
      const localTrait = new Trait(localTraitBase);
      localTrait.setXP(600);

      expect(localTrait.level).to.equal(5);
    });

    it(`should return 0 if there's not enough XP for the minimum value`, () => {
      const localTraitBase = new TraitBase({
        name: 'test',
        multipleAllowed: false,
        min: 2,
      });
      const localTrait = new Trait(localTraitBase);
      localTrait.setXP(100);

      expect(localTrait.level).to.equal(0);
    });
  });

  describe('Active state', () => {
    it('should not be active if it has 0 points', () => {
      const localTraitBase = new TraitBase({});
      const localTrait = new Trait(localTraitBase);

      expect(localTrait.isActive()).to.equal(false);
    });

    it('should be active if it has a positive number of points', () => {
      const localTraitBase = new TraitBase({ name: 'test' });
      const localTrait = new Trait(localTraitBase);
      localTrait.setXP(100);

      expect(localTrait.isActive()).to.equal(true);
    });

    it('should be active if it has a negative number of points', () => {
      const localTraitBase = new TraitBase({ name: 'test' });
      const localTrait = new Trait(localTraitBase);
      localTrait.setXP(-100);

      expect(localTrait.isActive()).to.equal(true);
    });
  });

  describe('Stringifying', () => {
    const traitName = 'Coolness';
    const localTraitBase = new TraitBase({ name: traitName });
    const subDesc = 'Sunglasses';
    const subject = 'Aviators';
    const pointValue = 1;

    it(`should include the trait's name, at minimum`, () => {
      const localTrait = new Trait(localTraitBase);

      expect(localTrait.toString()).to.equal(traitName);
    });

    it('should include the point value, if the trait is active', () => {
      const localTrait = new Trait(localTraitBase);
      localTrait.setXP(100);

      expect(localTrait.toString()).to.equal(`${traitName} (${pointValue})`);
    });

    it('should include the sub-description, if there is one', () => {
      const localTrait = new Trait(localTraitBase);
      localTrait.setXP(100);
      localTrait.subDescription = subDesc;

      expect(localTrait.toString())
        .to
        .equal(`${traitName} (${pointValue})/${subDesc}`);
    });

    it('should include the subject, if there is one', () => {
      const localTrait = new Trait(localTraitBase);
      localTrait.setXP(100);
      localTrait.subDescription = subDesc;
      localTrait.subject = subject;

      expect(localTrait.toString())
        .to
        .equal(`${traitName} (${pointValue})/${subDesc} (${subject})`);
    });
  });
});
