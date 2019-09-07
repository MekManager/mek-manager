import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { Validator } from './validator';

export class CantHaveModuleValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = `Can't Have Module Validator`;
    this.errors = [];
    this._config = config;
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const name: string = this._config['name'];
    const hasRestrictedModule = character
      .lifeModules()
      .find(l => l.name === name) !== undefined;

    if (hasRestrictedModule) {
      this.errors.push({
        message: `Module ${name} is not allowed`,
        origin: this.name,
      });

      return false;
    } else {
      return true;
    }
  }
}
