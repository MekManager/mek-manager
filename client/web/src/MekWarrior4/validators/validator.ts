import { Character } from '../characters';
import { ValidationError } from '../errorMessage';

export interface Validator {
  errors: ValidationError[];
  name: string;

  valid (character: Character): boolean;
}
