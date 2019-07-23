import { Attributes, newAttributes } from './attributes';
import { CharacterFlavor, newCharacterFlavor } from './characterFlavor';
import { CharacterLifeModule } from './characterLifeModule';
import { LifeModule } from './lifeModule';
import { LifeStage } from './lifeStage';
import { Skill } from './skills';
import { Trait } from './traits';

export class Character {
  // TODO: names should have more to them than just being a single string.
  public name: string;
  public flavor: CharacterFlavor;
  public attributes: Attributes;
  public skills: Skill[];
  public traits: Trait[];

  private _affiliations: CharacterLifeModule[];
  private _lifeModules: CharacterLifeModule[];

  constructor () {
    this.name = '';
    this._affiliations = undefined;
    this._affiliations = [];
    this._lifeModules = [];
    this.flavor = newCharacterFlavor();
    this.attributes = newAttributes();
    this.skills = [] as Skill[];
    this.traits = [] as Trait[];
  }

  public addAffiliation (lm: LifeModule): void {
    this.addLifeModule(LifeStage.AFFILIATION, lm);
  }

  public addLifeModule (stage: LifeStage, lm: LifeModule): void {
    const alreadyTaken = this._lifeModules.filter(
      l => l.stage === stage && l.module.name === lm.name
    ).length > 0;

    // Can't take the same affiliation twice
    if (stage === LifeStage.AFFILIATION && alreadyTaken) {
      return;
    }

    this._lifeModules.push(new CharacterLifeModule(stage, lm));

    /* If the `LifeModule` being added is an affiliation make sure that the
     * _affiliations array gets re-cached.
     */
    if (lm.stage === LifeStage.AFFILIATION) {
      this._affiliations = [];
      this.affiliations();
    }
  }

  public affiliations (): CharacterLifeModule[] {
    if (this._affiliations.length === 0) {
      this._affiliations = this._lifeModules.filter(
        lm => lm.stage === LifeStage.AFFILIATION
      ) as CharacterLifeModule[];

      return this._affiliations;
    } else {

      return this._affiliations;
    }
  }

  /* Putting a "getter" in place for this because I expect there are going to
   * be special access rules for life modules in the future. And it's better to
   * plan for that now then have to do a bunch of messy refactoring of a public
   * value down the line.
   */
  public lifeModules (): CharacterLifeModule[] {
    return this._lifeModules;
  }

  public skillStrings (): string[] {
    return this.skills.map(s => s.toString());
  }

  public traitStrings (): string[] {
    return this.traits.map(t => t.toString());
  }
}

