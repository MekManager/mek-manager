import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { Validator } from './validator';

export class CantHaveModuleValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  constructor () {
    this.name = `Can't Have Module Validator`;
    this.errors = [];
  }

  public valid (character: Character): boolean {
    return false;
  }
}
