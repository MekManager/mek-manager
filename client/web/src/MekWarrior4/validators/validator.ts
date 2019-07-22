import { Character } from '../characters';
import { ValidationError } from '../errorMessage';

export interface Validator {
  errors: ValidationError[];
  name: string;

  validate (character: Character): boolean;
}
