import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { RuleName } from '../rule';
import { Validator } from './validator';

export class SingularAffiliationValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  constructor () {
    this.name = 'Singular Affiliation Validator';
    this.errors = [];
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const affiliationCount = character.affiliations().length;
    const nonSingularAffiliation = character.affiliations().find(
      a => a.hasRuleFor(RuleName.CANNOT_BE_ONLY_AFFILIATION)
    );

    if (nonSingularAffiliation) {
      const alone = affiliationCount === 1;
      if (alone) {
        this.errors.push({
          message: `Module ${nonSingularAffiliation.name} cannot be a sole affiliation`,
          origin: this.name,
        });

        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}
