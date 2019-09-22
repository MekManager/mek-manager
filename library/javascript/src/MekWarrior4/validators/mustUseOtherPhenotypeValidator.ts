import { Character } from '../character';
import { ValidationError } from '../errorMessage';
import { Validator } from './validator';

export class MustUseOtherPhenotypeValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = 'Must Use Other Phenotype Validator';
    this.errors = [];

    this._config = config;
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const phenotypeName: string = this._config['restrictedPhenotype'];
    const otherPhenotype: string = this._config['phenotype'];
    const phenotype = character
      .traits
      .find(
        t => t.base.name === 'Phenotype' && t.subDescription === phenotypeName
      );

    if (phenotype === undefined) {
      return true;
    } else {
      this.errors.push({
        message: `The Phenotype ${phenotypeName} cannot be taken, ${otherPhenotype} must be used instead`,
        origin: this.name,
      });

      return false;
    }
  }
}

