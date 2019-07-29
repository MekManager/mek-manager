import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { Validator } from './validator';

export class TraitCantGoHigherThanOtherTraitValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = "Trait Can't Go Higher Than Other Trait Validator";
    this.errors = [];

    this._config = config;
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const traitName: string = this._config['trait'];
    const restrictingTraitName: string = this._config['restrictingTrait'];

    const trait = character.getTrait(traitName);
    const restrictingTrait = character.getTrait(restrictingTraitName);

    // Neither trait is present, no reason to do additional work
    if (!trait && !restrictingTrait) {
      return true;
    }

    // The restricting trait is present, but not the restricted trait, so
    // there's nothing else to be compared.
    if (!trait && restrictingTrait) {
      return true;
    }

    // The restricted trait is inherently higher than the restricting trait
    // because the restricting trait doesn't even exist.
    if (trait && !restrictingTrait) {
      this.errors.push({
        message: `The level of the trait "${traitName}" cannot go higher than the level of trait "${restrictingTraitName}", but "${restrictingTraitName}" is missing`,
        origin: this.name,
      });

      return false;
    }

    if (trait && restrictingTrait) {
      if (trait.level <= restrictingTrait.level) {
        return true;
      } else {
        this.errors.push({
          message: `The level of the trait "${traitName}" cannot go higher than the level of trait "${restrictingTraitName}"`,
          origin: this.name,
        });

        return false;
      }
    }
  }
}

