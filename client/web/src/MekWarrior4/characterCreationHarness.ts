import { Affiliation } from './affiliation';
import { Character } from './characters';
import { ValidationError } from './errorMessage';
import { LifeModule } from './lifeModule';
import { LifeStage } from './lifeStage';

export class CharacterCreationHarness {
  public errors: ValidationError[];

  private _character: Character;
  private _affiliations: Affiliation[];
  private _lifeModules: { stage: LifeStage, module: LifeModule }[];
  private _valid: boolean;

  constructor (character: Character = undefined) {
    this._valid = false;
    this._affiliations = [];
    this._lifeModules = [];

    if (character) {
      this._character = character;
    } else {
      this._character = new Character();
    }
  }

  public addAffiliation (a: Affiliation): void {
    this._affiliations.push(a);
  }

  public addModule (stage: LifeStage, module: LifeModule): void {
    this._lifeModules.push({ stage, module });
  }

  public valid (): boolean {
    return this._valid;
  }

  private legalChildLabor (): boolean {
    const found = this._affiliations.filter(affil => affil.legalChildLabor());

    return found && found.length > 0;
  }

  /*
   * TODO: Find a better way to accomplish validation. This is getting pretty
   * gross pretty fast. The way this is shaping up, the `validate` method is
   * going to have to know about every special rule and what would comply with
   * or break that rule.
   */
  public validate (): void {
    this.errors = this._lifeModules.reduce((acc, lm) => {
      if (lm.stage !== lm.module.stage) {
        if (this.legalChildLabor() && lm.stage === 2 && lm.module.stage === 4) {
          return acc;
        } else {
          return acc.concat([{
            message: `Module ${lm.module.name} cannot be used for stage ${lm.stage} it is a stage ${lm.module.stage} module`,
          }]);
        }
      } else {
        return acc;
      }
    }, [] as { message: string }[]);

    this._valid = this.errors.length === 0;
  }
}
