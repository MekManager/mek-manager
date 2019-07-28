import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { LifeStage } from '../lifeStage';
import { RuleName } from '../rule';
import { Validator } from './validator';

/**
 * This rule is extremely niche, and requires some very specific checks. It
 * will probably be a good idea to revisit it later and see if there's a
 * better way to do this. It may be possible to write something more generic
 * for it.
 *
 * The important thing at time of writing is getting it working.
 */
export class NoMekWarriorsOrBattleArmorValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  constructor () {
    this.name = 'No MekWarriors or Battle Armor Validator';
    this.errors = [];
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const disallowedFields = ['MekWarrior', 'Battle Armor'];
    const currentAffiliation = character.currentAffiliation();

    // There's nothing to check yet
    if (currentAffiliation === undefined) {
      return true;
    }

    /* This is one of the specific things about this rule. It's meant to
     * represent a character living in a much less developed part of human space
     * where Meks and especially Battle Armor aren't present.
     *
     * This validator will get pulled in if this restriction is anywhere in the
     * character's life. But it should only be *checked* if the character still
     * currently holds the affiliation that brought this validator in.
     *
     * If there affiliation has changed, they would be in a different part of
     * space where they'd have access to Meks and Battle Armor.
     */
    const needToCheck = currentAffiliation.module.ruleFor(
      RuleName.NO_MECHWARRIORS_OR_BATTLEARMOR
    );

    if (needToCheck) {
      this.errors = [];
      const higherEd = character.lifeModules().filter(
        l => l.stage === LifeStage.HIGHER_EDUCATION
      );
      const brokenRule = higherEd.find(
        l => disallowedFields.includes(l.field)
      );

      if (brokenRule) {
        this.errors.push({
          message: `This character cannot be trained to use either a Mek or Battle Armor`,
          origin: this.name,
        });

        return false;
      } else {
        // They are still subject to the rule, but are abiding by it
        return true;
      }
    } else {
      // The character is no longer subject to this rule
      return true;
    }
  }
}

