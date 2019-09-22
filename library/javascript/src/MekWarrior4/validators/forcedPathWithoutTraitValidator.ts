import { Character } from '../character';
import { ValidationError } from '../errorMessage';
import { Validator } from './validator';

export class ForcedPathWithoutTraitValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = 'Forced Path Without Trait Validator';
    this.errors = [];
    this._config = config;
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const name: string = this._config['trait'];
    const trait = character.getTrait(name);

    // Don't over-think it, if we have the trait there's no sense in doing more
    // work than necessary.
    if (trait) {
      return true;
    } else {
      // If the character doesn't have the trait, they can still be valid if
      // they're on the restricted path.
      const restrictedStage: number = this._config['stage'];
      const moduleName: string = this._config['module'];

      // Find any modules that have been taken for the restricted stage but
      // AREN'T the allowed module.
      const offPath = character.lifeModules.filter(l =>
        l.stage === restrictedStage && l.name !== moduleName
      ).length > 0;

      if (offPath) {
        this.errors.push({
          message: `This character's path is restricted by the trait ${name}. They must either have that trait, or take ${moduleName} for stage ${restrictedStage}`,
          origin: this.name,
        });

        return false;
      } else {

        return true;
      }
    }
  }
}
