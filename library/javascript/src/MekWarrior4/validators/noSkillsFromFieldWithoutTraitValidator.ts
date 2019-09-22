import { Character } from '../character';
import { ValidationError } from '../errorMessage';
import { Validator } from './validator';

export class NoSkillsFromFieldWithoutTraitValidator implements Validator {
  public name: string;
  public errors: ValidationError[];

  private readonly _config: {};

  constructor (config: {}) {
    this.name = 'No Skills From Field Without Trait Validator';
    this.errors = [];

    this._config = config;
  }

  // NOTE: The way this accomplishes validation is _technically_ incorrect. It
  // checks to see if the given character has taken the restricted field at any
  // point during creation.
  //
  // _Technically_, a character could buy back *every* skill they took during
  // creation from that field, and be in a state where they had taken the field
  // but have no remaining skills from it. This is such a niche possibility
  // that I'm going to ignore it; though I still think it's worth documenting
  // this approaches limitations.
  //
  // The alternative is to have this validator check for what skills are tied
  // to a field; but this introduces the possibility of a validator making a
  // network request. I'm very hesitant to introduce something like that when
  // every other validator is pure.
  //
  // Maybe there's a way to attach meta data to a skill to say if it's been
  // effected by a field?
  public valid (character: Character): boolean {
    this.errors = [];
    const fieldName: string = this._config['field'];
    const traitName: string = this._config['trait'];

    const hasField = !!character.lifeModules().find(
      l => !!l.fields.find(f => f === fieldName)
    );
    const trait = character.getTrait(traitName);

    // This character has taken the restricted field, but they are lacking the
    // required trait so they're invalid.
    if (!trait && hasField) {
      this.errors.push({
        message: `Taking skills from ${fieldName} requires having the trait ${traitName}`,
        origin: this.name,
      });

      return false;
    } else {
      // This covers 3 other conditions:
      //   - Having neither the trait or the field
      //   - Having both the trait and the field
      //   - Having the trait but not the field
      return true;
    }
  }
}

