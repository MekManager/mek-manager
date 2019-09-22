import { Character } from '../character';
import { ValidationError } from '../errorMessage';

export interface Validator {
  errors: ValidationError[];
  name: string;

  valid (character: Character): boolean;
}
