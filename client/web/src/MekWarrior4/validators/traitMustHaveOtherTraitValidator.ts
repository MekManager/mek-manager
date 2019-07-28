import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { LifeStage } from '../lifeStage';
import { RuleName } from '../rule';
import { Validator } from './validator';

export class TraitMustHaveOtherTraitValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = 'Trait Must Have Other Trait Validator';
    this.errors = [];

    this._config = config;
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const mainTraitName: string = this._config['mainTrait'];
    const requiredTraitName: string = this._config['requiredTrait'];

    const mainTrait = character.traits.find(t => t.name() === mainTraitName);

    if (mainTrait) {
      const requiredTrait = character.traits.find(
        t => t.name() === requiredTraitName
      );

      if (requiredTrait) {
        return true;
      } else {
        this.errors.push({
          message: `The trait ${mainTraitName} requires the character also has ${requiredTraitName}`,
          origin: this.name,
        });

        return false;
      }
    } else {
      // If there character doesn't have the trait that requires another, then
      // there's no restriction to enforce.
      return true;
    }
  }
}
