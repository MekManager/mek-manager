import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { LifeStage } from '../lifeStage';
import { Rule } from '../rules';
import { Validator } from './validator';

export class ClanValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  constructor () {
    this.name = 'Clan Validator';
  }

  public valid (character: Character): boolean {
    const hasClanAffiliation = character
      .affiliations()
      .filter(a => a.module.isClan)
      .length > 0;

    const canActAsClan = character
      .affiliations()
      .filter(a => a.module.rules.includes(Rule.ACTS_AS_CLAN))
      .length > 0;

    const characterIsTrueborn = character
      .traits
      .find(t => t.base.name === 'Phenotype') !== undefined;

    this.errors = character.lifeModules().reduce(
      (errors, lifeModule) => {
        // Skip affiliations, we care about early childhood and on
        if (lifeModule.stage === LifeStage.AFFILIATION) {
          return errors;
        }

        if (lifeModule.module.isClan) {
          const truebornExclusive = lifeModule.module.rules.includes(Rule.TRUEBORN_ONLY);
          const canTakeClanModules = (hasClanAffiliation || canActAsClan);

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

    return this.errors.length === 0;
  }
}
