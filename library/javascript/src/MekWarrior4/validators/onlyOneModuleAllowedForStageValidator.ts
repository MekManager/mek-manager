import { Character } from '../characters';
import { ValidationError } from '../errorMessage';
import { LifeStage } from '../lifeStage';
import { Validator } from './validator';

export class OnlyOneModuleAllowedForStageValidator implements Validator {
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
    const allowedModule: string = this._config['module'];
    const modules = character.lifeModules().filter(
      m => m.stage === stage && m.module.name !== allowedModule
    );

    if (modules.length === 0) {
      return true;
    } else {
      this.errors.push({
        message: `This character cannot take any life modules for stage ${stage} but ${allowedModule}`,
        origin: this.name,
      });

      return false;
    }
  }
}


