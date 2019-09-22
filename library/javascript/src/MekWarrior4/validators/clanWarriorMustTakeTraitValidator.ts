import { Character } from '../character';
import { isWarriorCaste } from '../clanCaste';
import { ValidationError } from '../errorMessage';
import { RuleName } from '../ruleName';
import { Validator } from './validator';

export class ClanWarriorMustTakeTraitValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = 'Clan Warrior Must Take Trait Validator';
    this.errors = [];

    this._config = config;
  }

  public valid (character: Character): boolean {
    const traitName = this._config['trait'];
    const trait = character.traits.find(t => t.base.name === traitName);
    const hasClanAffiliation = character
      .affiliations()
      .filter(a => a.isClan)
      .length > 0;
    const canActAsClan = character
      .affiliations()
      .filter(a => a.hasRuleFor(RuleName.ACTS_AS_CLAN))
      .length > 0;

    if (isWarriorCaste(character.caste) && (hasClanAffiliation || canActAsClan)) {
      if (trait === undefined) {
        this.errors.push({
          message: `This character must have the trait ${traitName}`,
          origin: this.name,
        });

        return false;
      } else {
        // The character has the trait, so we're good
        return true;
      }
    } else {
      // There's nothing to do without a clan affiliation, or an affiliation
      // that can act as one. Or if they aren't a warrior.
      return true;
    }
  }
}


