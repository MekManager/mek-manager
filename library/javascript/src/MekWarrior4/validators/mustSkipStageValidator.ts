import { Character } from '../character';
import { ValidationError } from '../errorMessage';
import { LifeStage } from '../lifeStage';
import { Validator } from './validator';

export class MustSkipStageValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = 'Must Skip Stage Validator';
    this.errors = [];

    this._config = config;
  }

  public valid (character: Character): boolean {
    this.errors = [];
    const stage: LifeStage = this._config['stage'];
    const modules = character.lifeModules.filter(m => m.stage === stage);

    if (modules.length === 0) {
      return true;
    } else {
      this.errors.push({
        message: `This character cannot take any life modules for stage ${stage}`,
        origin: this.name,
      });

      return false;
    }
  }
}

