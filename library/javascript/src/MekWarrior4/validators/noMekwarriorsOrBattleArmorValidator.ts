import { Character } from '../character';
import { ValidationError } from '../errorMessage';
import { LifeStage } from '../lifeStage';
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

    const higherEd = character.lifeModules().filter(
      l => l.stage === LifeStage.HIGHER_EDUCATION
    );
    const brokenRule = higherEd.find(
      l => !!l.fields.find(f => disallowedFields.includes(f))
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

  }
}

