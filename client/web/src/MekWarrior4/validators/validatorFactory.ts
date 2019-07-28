import { Character } from '../characters';
import { Rule, RuleName } from '../rule';
import { AttributeMinimumForTraitValidator } from './attributeMinimumForTraitValidator';
import { CantHaveModuleValidator } from './cantHaveModuleValidator';
import { ChildLaborValidator } from './childLaborValidator';
import { ClanValidator } from './clanValidator';
import { ForcedPathWithoutTraitValidator } from './forcedPathWithoutTraitValidator';
import { SingularAffiliationValidator } from './singularAffiliationValidator';
import { TraitMustHaveOtherTraitValidator } from './traitMustHaveOtherTraitValidator';
import { TraitNotAllowedValidator } from './traitNotAllowedValidator';
import { Validator } from './validator';
import { AttributeMinimumForTraitFromStageValidator } from './attributeMinimumForTraitFromStageValidator';

export class ValidatorFactory {

  public static validators (character: Character): Validator[] {
    /* NOTE: This loop is pretty tight, but I'm not overly worried about it
     * because the collections it loops over are rarely even going to be in the
     * 10's of items.
     */
    const characterSpecificValidators = character.lifeModules().reduce(
      (validators, lm) => {
        return validators.concat(lm.module.rules.reduce((vs, rule) => {
          const validator = ValidatorFactory.createFor(rule);
          if (validator) {
            vs.push(validator);
          }

          return vs;
        }, [] as Validator[]));
      }, [] as Validator[]);

    return ValidatorFactory.baseValidators().concat(characterSpecificValidators);
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
  public static createFor (rule: Rule): Validator {
    switch (rule.name) {
      case RuleName.CANNOT_BE_ONLY_AFFILIATION:
        return new SingularAffiliationValidator();
      case RuleName.CANT_HAVE_MODULE:
        return new CantHaveModuleValidator(rule.config);
      case RuleName.FORCED_PATH_WITHOUT_TRAIT:
        return new ForcedPathWithoutTraitValidator(rule.config);
      case RuleName.MINIMUM_ATTRIBUTE_SCORE_FOR_TRAIT:
        return new AttributeMinimumForTraitValidator(rule.config);
      case RuleName.MINIMUM_ATTRIBUTE_SCORE_FOR_TRAIT_IN_STAGE:
        return new AttributeMinimumForTraitFromStageValidator(rule.config);
      case RuleName.TRAIT_MUST_HAVE_OTHER_TRAIT:
        return new TraitMustHaveOtherTraitValidator(rule.config);
      case RuleName.TRAIT_NOT_ALLOWED:
        return new TraitNotAllowedValidator(rule.config);
      default:
        return undefined;
    }
  }

  private static baseValidators (): Validator[] {
    return [
      new ChildLaborValidator(),
      new ClanValidator(),
    ];
  }
}
