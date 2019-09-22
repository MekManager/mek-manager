import { Attribute } from './attribute';
import { Character } from './character';
import { CharacterLifeModule } from './characterLifeModule';
import { ClanCaste } from './clanCaste';
import { ValidationError } from './errorMessage';
import { LifeModule } from './lifeModule';
import { LifeStage } from './lifeStage';
import { Trait } from './trait';
import { ValidatorFactory } from './validators/validatorFactory';

/**
 * This "harness" is making less sense as I'm going on with it. I'm not sure if
 * I'm going to need it much longer. I think I'm going to be able to fold it
 * into the Character class at this rate.
 *
 * The intent of this class is to be something that knows how to do things like
 * undo and redo as a user alters their character during creation.
 */
export class CharacterCreationHarness {
  public errors: ValidationError[];

  private _character: Character;
  private _valid: boolean;

  constructor (character: Character = undefined) {
    this._valid = false;

    if (character) {
      this._character = character;
    } else {
      this._character = new Character();
    }
  }

  public addAttributeXP (attr: Attribute, xp: number): void {
    this._character.addAttributeXP(attr, xp);
  }

  public removeAttributeXP (attr: Attribute, xp: number): void {
    this._character.removeAttributeXP(attr, xp);
  }

  public addAffiliation (lm: LifeModule): void {
    this._character.addAffiliation(lm);
  }

  public addCaste (caste: ClanCaste): void {
    this._character.caste = caste;
  }

  public addModule (stage: LifeStage, module: LifeModule, field?: string): void {
    this._character.addLifeModule(stage, module, field);
  }

  public addTrait (trait: Trait): void {
    this._character.traits.push(trait);
  }

  public valid (): boolean {
    return this._valid;
  }

  // NOTE: this is again showing how this is pretty quickly being outgrown.
  public modules (): CharacterLifeModule[] {
    return this._character.lifeModules;
  }

  public validate (): boolean {
    const validators = ValidatorFactory.validators(this._character);

    this.errors = validators.reduce((errors, validator) => {
      if (validator.valid(this._character)) {
        return errors;
      } else {
        return errors.concat(validator.errors);
      }
    }, [] as ValidationError[]);

    this._valid = this.errors.length === 0;

    return this.valid();
  }
}
