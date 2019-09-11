import { Attribute } from '../attribute';
import { Character } from '../character';
import { ValidationError } from '../errorMessage';
import { Validator } from './validator';

export class AttributeMinimumForTraitValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = 'Attribute Minimum For Trait Validator';
    this.errors = [];
    this._config = config;
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const traitName: string = this._config['trait'];
    const attributeName: Attribute = this._config['attribute'];
    const requiredScore: number = this._config['score'];
    const trait = character.getTrait(traitName);

    if (trait) {
      const currentScore = character.attributes.get(attributeName).score;

      if (currentScore >= requiredScore) {
        return true;
      } else {
        this.errors.push({
          message: `The trait ${traitName} is required to have a score of ${requiredScore} for the attribute ${attributeName}, but it's current score is only ${currentScore}`,
          origin: this.name,
        });

        return false;
      }

    } else {
      // If the character doesn't have the trait, no checking needs to be done.
      return true;
    }
  }
}
