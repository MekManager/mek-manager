import { Character } from '../character';
import { Rule } from '../rule';
import { RuleName } from '../ruleName';
import { AttributeMinimumForTraitFromStageValidator } from './attributeMinimumForTraitFromStageValidator';
import { AttributeMinimumForTraitValidator } from './attributeMinimumForTraitValidator';
import { CantHaveModuleValidator } from './cantHaveModuleValidator';
import { ChildLaborValidator } from './childLaborValidator';
import { ClanValidator } from './clanValidator';
import { ClanWarriorMustTakeTraitValidator } from './clanWarriorMustTakeTraitValidator';
import { ForcedPathWithoutTraitValidator } from './forcedPathWithoutTraitValidator';
import { MustSkipStageValidator } from './mustSkipStageValidator';
import { MustUseOtherPhenotypeValidator } from './mustUseOtherPhenotypeValidator';
import { NoMekWarriorsOrBattleArmorValidator } from './noMekwarriorsOrBattleArmorValidator';
import { NoSkillsFromFieldWithoutTraitValidator } from './noSkillsFromFieldWithoutTraitValidator';
import { OnlyOneModuleAllowedForStageValidator } from './onlyOneModuleAllowedForStageValidator';
import { SingularAffiliationValidator } from './singularAffiliationValidator';
import { TraitCantGoHigherThanOtherTraitValidator } from './traitCantGoHigherThanOtherTraitValidator';
import { TraitMustHaveOtherTraitValidator } from './traitMustHaveOtherTraitValidator';
import { TraitNotAllowedValidator } from './traitNotAllowedValidator';
import { Validator } from './validator';

/**
 * Takes a list of validators and a rule, if that rule has a validator associated
 * with it, it appends that validator to the given list.
 */
const validatorsForRule = (validators: Validator[], rule: Rule): Validator[] => {
  const validator = ValidatorFactory.createFor(rule);
  if (validator) {
    validators.push(validator);
  }

  return validators;
};

export class ValidatorFactory {

  public static validators (character: Character): Validator[] {
    // NOTE: This loop is pretty tight, but I'm not overly worried about it
    // because the collections it loops over are rarely even going to be in the
    // 10's of items.
    //
    // This reduces over each of a characters life modules, and for each life
    // module reduces it's rules into a list of validators. Then adds that to
    // the list of base validators that should always be checked.
    const characterSpecificValidators = character.activeLifeModules.reduce(
      (validators, lm) =>
        validators.concat(lm.rules.reduce(validatorsForRule, [])), []
    );

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
      case RuleName.TRAIT_CANT_GO_HIGHER_THAN_OTHER:
        return new TraitCantGoHigherThanOtherTraitValidator(rule.config);
      case RuleName.NO_SKILLS_FROM_FIELD_WITHOUT_TRAIT:
        return new NoSkillsFromFieldWithoutTraitValidator(rule.config);
      case RuleName.CLAN_MUST_USE_OTHER_PHENOTYPE:
        return new MustUseOtherPhenotypeValidator(rule.config);
      case RuleName.CLAN_WARRIOR_MUST_TAKE_TRAIT:
        return new ClanWarriorMustTakeTraitValidator(rule.config);
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
