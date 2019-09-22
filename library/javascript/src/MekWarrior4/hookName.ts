/**
 * I'm not 100% sure what these are yet. But they aren't actually "Rules",
 * they're really descriptions of actions that need to happen when a particular
 * action is taken.
 *
 * I'm moving them out into this list for the moment so they aren't sitting in
 * the rules enum.
 */
export enum HookName {
  EXEMPT_FROM_COST_SPLITTING = 'exempt_from_cost_splitting',
  MODIFY_TRAIT_XP_BECAUSE_OF_TRAIT = 'modify_trait_xp_because_of_trait',
  SYNC_TRAIT_LOSS = 'sync_trait_loss',
  SYNC_TRAIT_LOSS_ADD_OTHERS = 'sync_trait_loss_add_others',
}
