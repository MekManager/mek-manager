import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { Validator } from './validator';

export class TraitNotAllowedValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = 'Trait Not Allowed Validator';
    this.errors = [];

    this._config = config;
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const traitName: string = this._config['trait'];

    if (character.traits.find(t => t.name() === traitName)) {
      this.errors.push({
        message: `The trait ${traitName} is not allowed`,
        origin: this.name,
      });

      return false;
    } else {
      return true;
    }
  }
}
