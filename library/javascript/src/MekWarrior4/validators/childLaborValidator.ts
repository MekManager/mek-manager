import { Character } from '../character';
import { ValidationError } from '../errorMessage';
import { LifeStage } from '../lifeStage';
import { RuleName } from '../ruleName';
import { Validator } from './validator';

export class ChildLaborValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  constructor () {
    this.name = 'Child Labor Validator';
    this.errors = [];
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const legalChildLabor = character
      .affiliations()
      .filter(a => a.hasRuleFor(RuleName.LEGAL_CHILD_LABOR))
      .length > 0;

    this.errors = character.lifeModules.reduce(
      (errors, lifeModule) => {
        if (
          !legalChildLabor &&
          lifeModule.stage === LifeStage.LATE_CHILDHOOD &&
          lifeModule.baseStage === LifeStage.REAL_LIFE
        ) {
          errors.push({
            message: `Module ${lifeModule.name} cannot be used for stage ${lifeModule.stage} it is a stage ${lifeModule.baseStage} module`,
            origin: this.name,
          });
        }

        return errors;
      },
      [] as ValidationError[]
    );

    return this.errors.length === 0;
  }
}
