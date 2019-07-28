import { Character } from '../characters';
import { Rule, RuleName } from '../rule';
import { AttributeMinimumForTraitFromStageValidator } from './attributeMinimumForTraitFromStageValidator';
import { AttributeMinimumForTraitValidator } from './attributeMinimumForTraitValidator';
import { CantHaveModuleValidator } from './cantHaveModuleValidator';
import { ChildLaborValidator } from './childLaborValidator';
import { ClanValidator } from './clanValidator';
import { ForcedPathWithoutTraitValidator } from './forcedPathWithoutTraitValidator';
import { MustSkipStageValidator } from './mustSkipStageValidator';
import { NoMekWarriorsOrBattleArmorValidator } from './noMekwarriorsOrBattleArmorValidator';
import { OnlyOneModuleAllowedForStageValidator } from './onlyOneModuleAllowedForStageValidator';
import { SingularAffiliationValidator } from './singularAffiliationValidator';
import { TraitMustHaveOtherTraitValidator } from './traitMustHaveOtherTraitValidator';
import { TraitNotAllowedValidator } from './traitNotAllowedValidator';
import { Validator } from './validator';

export class ValidatorFactory {

  public static validators (character: Character): Validator[] {
    /* NOTE: This loop is pretty tight, but I'm not overly worried about it
     * because the collections it loops over are rarely even going to be in the
     * 10's of items.
     *
     * This reduces over each of a characters life modules, and for each life
     * module reduces it's rules into a list of validators. Then adds that to
     * the list of base validators that should always be checked.
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
      case RuleName.MUST_SKIP_STAGE:
        return new MustSkipStageValidator(rule.config);
      case RuleName.ONLY_ONE_MODULE_ALLOWED_FOR_STAGE:
        return new OnlyOneModuleAllowedForStageValidator(rule.config);
      case RuleName.NO_MECHWARRIORS_OR_BATTLEARMOR:
        return new NoMekWarriorsOrBattleArmorValidator();
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
