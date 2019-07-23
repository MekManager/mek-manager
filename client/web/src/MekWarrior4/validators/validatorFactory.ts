import { Rule } from '../rules';
import { ChildLaborValidator } from './childLaborValidator';
import { ClanValidator } from './clanValidator';
import { Validator } from './validator';


export class ValidatorFactory {

  public static validators (): Validator[] {
    // This will eventually be combined with other non-base validators
    return ValidatorFactory.baseValidators();
  }

  /* What this should really be for is for figuring out what *SPECIAL* rules are
   * necessary for validating a character. For example: Child Labor being
   * illegal, and Clan modules being unique are base level rules that need to be
   * validated. BUT some rules allow for exemptions.
   *
   * This method should not be about exemptions. The base rule validators will
   * have to know how to account for their exemptions. This should be
   * exclusively about non-base rules.
   */
  public static createFor (uniqueId: Rule): Validator {
    switch (uniqueId) {
      case Rule.LEGAL_CHILD_LABOR:
        return new ChildLaborValidator();
    }
  }

  private static baseValidators (): Validator[] {
    return [
      new ChildLaborValidator(),
      new ClanValidator(),
    ];
  }
}
