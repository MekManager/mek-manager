import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { LifeStage } from '../lifeStage';
import { RuleName } from '../rule';
import { Validator } from './validator';

export class ClanValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  constructor () {
    this.name = 'Clan Validator';
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const hasClanAffiliation = character
      .affiliations()
      .filter(a => a.module.isClan)
      .length > 0;

    const canActAsClan = character
      .affiliations()
      .filter(a => a.module.hasRuleFor(RuleName.ACTS_AS_CLAN))
      .length > 0;

    const characterIsTrueborn = character
      .traits
      .find(t => t.base.name === 'Phenotype') !== undefined;

    const canTakeClanModules = (hasClanAffiliation || canActAsClan);

    this.errors = character.lifeModules().reduce(
      (errors, lifeModule) => {
        // Skip affiliations, we care about early childhood and on
        if (lifeModule.stage === LifeStage.AFFILIATION) {
          return errors;
        }

        if (lifeModule.module.isClan) {
          const truebornExclusive = lifeModule.module.hasRuleFor(RuleName.TRUEBORN_ONLY);

          if (!truebornExclusive && !canTakeClanModules) {
            errors.push({
              message: `Module ${lifeModule.module.name} is restricted to Clan characters`,
              origin: this.name,
            });
          } else if (truebornExclusive && !characterIsTrueborn) {
            errors.push({
              message: `Module ${lifeModule.module.name} is exclusive to TrueBorn characters`,
              origin: this.name,
            });
          }
        }

        return errors;
      },
      []
    );

    if (canTakeClanModules && character.caste === undefined) {
      if (character.currentAffiliation().module.name !== 'Independent/Pirate') {
        this.errors.push({
          message: `This character does not have a Caste. They must either take one, or join the "Dark Caste" by taking the Independent/Pirate affiliation`,
          origin: this.name,
        });
      }
    }

    return this.errors.length === 0;
  }
}
