import { Character } from '../character';
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
      .filter(a => a.isClan)
      .length > 0;

    const canActAsClan = character
      .affiliations()
      .filter(a => a.hasRuleFor(RuleName.ACTS_AS_CLAN))
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

        if (lifeModule.isClan) {
          const truebornExclusive = lifeModule.hasRuleFor(RuleName.TRUEBORN_ONLY);

          if (!truebornExclusive && !canTakeClanModules) {
            errors.push({
              message: `Module ${lifeModule.name} is restricted to Clan characters`,
              origin: this.name,
            });
          } else if (truebornExclusive && !characterIsTrueborn) {
            errors.push({
              message: `Module ${lifeModule.name} is exclusive to TrueBorn characters`,
              origin: this.name,
            });
          }
        }

        return errors;
      },
      []
    );

    if (canTakeClanModules && character.caste === undefined) {
      if (character.currentAffiliation().name !== 'Independent/Pirate') {
        this.errors.push({
          message: `This character does not have a Caste. They must either take one, or join the "Dark Caste" by taking the Independent/Pirate affiliation`,
          origin: this.name,
        });
      }
    }

    return this.errors.length === 0;
  }
}
