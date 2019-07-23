/**
 * I'm not 100% sure what these are yet. But they aren't actually "Rules",
 * they're really descriptions of actions that need to happen when a particular
 * action is taken.
 *
 * I'm moving them out into this list for the moment so they aren't sitting in
 * the rules enum.
 */
enum Hook {
  EXEMPT_FROM_COST_SPLITTING = 'exempt_from_cost_splitting',
  MODIFY_TRAIT_XP_BECAUSE_OF_TRAIT = 'modify_trait_xp_because_of_trait',
  SYNC_TRAIT_LOSS = 'sync_trait_loss',
  SYNC_TRAIT_LOSS_ADD_OTHERS = 'sync_trait_loss_add_others',
}

export enum RuleName {
  ACTS_AS_CLAN = 'acts_as_clan', // DONE
  CANNOT_BE_ONLY_AFFILIATION = 'cannot_be_only_affiliation', // DONE
  CANT_HAVE_MODULE = 'cant_have_module',
  CLAN_DARK_CASTE = 'clan_dark_caste',
  CLAN_MUST_USE_OTHER_PHENOTYPE = 'clan_must_use_other_phenotype',
  CLAN_WARRIOR_MUST_TAKE_TRAIT = 'clan_warrior_must_take_trait',
  FORCED_PATH_WITHOUT_TRAIT = 'forced_path_without_trait',
  LEGAL_CHILD_LABOR = 'legal_child_labor', // DONE
  MINIMUM_ATTRIBUTE_SCORE_FOR_TRAIT = 'minimum_attribute_score_for_trait',
  MUST_SKIP_STAGE = 'must_skip_stage',
  NO_MECHWARRIORS_OR_BATTLEARMOR = 'no_mechwarriors_or_battlearmor',
  ONLY_ONE_MODULE_ALLOWED_FOR_STAGE = 'only_one_module_allowed_for_stage',
  TRAIT_CANT_GO_HIGHER_THAN_OTHER = 'trait_cant_go_higher_than_other',
  TRAIT_MUST_HAVE_OTHER_TRAIT = 'trait_must_have_other_trait',
  TRAIT_NOT_ALLOWED = 'trait_not_allowed',
  TRAIT_RESTRICTS_TRAIT = 'trait_restricts_trait',
  TRUEBORN_ONLY = 'trueborn_only', // DONE
}

/**
 * A `Rule` represents a character validation rule, and any associated config
 * that's required to enforce that rule.
 */
export class Rule {
  public name: RuleName;
  /* TODO: config being just any object feels prone to error down the road. It
   * works for now because I don't know what all is going to need to go into it.
   */
  public config: {};

  constructor (name: RuleName, config = {}) {
    this.name = name;
    this.config = config;
  }
}
