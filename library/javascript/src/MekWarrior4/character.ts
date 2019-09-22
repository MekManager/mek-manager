import { Experience, toString } from '../interfaces';
import { Attribute } from './attribute';
import { Attributes } from './attributes';
import { CharacterFlavor, newCharacterFlavor } from './characterFlavor';
import { CharacterLifeModule } from './characterLifeModule';
import { ClanCaste } from './clanCaste';
import { LifeModule } from './lifeModule';
import { LifeStage } from './lifeStage';
import { Name } from './name';
import { Skill } from './skill';
import { Trait } from './trait';

export class Character implements Experience {
  public name: Name;
  public xp: number;
  public flavor: CharacterFlavor;
  public attributes: Attributes;
  public skills: Skill[];
  public traits: Trait[];
  /** For Clan characters */
  public caste?: ClanCaste;

  private _affiliations: CharacterLifeModule[];
  private _lifeModules: CharacterLifeModule[];

  constructor () {
    this.name = new Name();
    this.xp = 0;
    this._affiliations = undefined;
    this._affiliations = [];
    this._lifeModules = [];
    this.flavor = newCharacterFlavor();
    this.attributes = new Attributes();
    this.skills = [] as Skill[];
    this.traits = [] as Trait[];
  }

  /**
   * Returns all life modules, regardless of if they are currently active.
   */
  get lifeModules (): CharacterLifeModule[] {
    return this._lifeModules;
  }

  /**
   * The first affiliation a character took.
   */
  get originalAffiliation (): CharacterLifeModule {
    return this.affiliations()[0];
  }

  /**
   * The affiliation this character currently holds.
   */
  get currentAffiliation (): CharacterLifeModule {
    const modules = this.affiliations();

    return modules[modules.length - 1];
  }

  /**
   * Returns an array of all life modules that are currently active on the
   * character. For example, this excludeds any affiliation other than the most
   * recent one, as only rules from the most recent (i.e. "active") affiliation
   * count.
   */
  get activeLifeModules (): CharacterLifeModule[] {
    const nonAffilations = this._lifeModules.filter(
      lm => lm.stage !== LifeStage.AFFILIATION
    );
    const currentAffiliation = this.currentAffiliation;

    if (currentAffiliation === undefined) {
      return nonAffilations;
    } else {
      return [ currentAffiliation, ...nonAffilations ];
    }
  }

  /**
   * Adds the given XP amount to this `Character`.
   *
   * @param xp The amount of XP to be added
   */
  public addXP (xp: number): void {
    this.xp += xp;
  }

  /**
   * Sets the given XP amount to this `Character`.
   *
   * @param xp The amount of XP to be set
   */
  public setXP (xp: number): void {
    this.xp = xp;
  }

  /**
   * Removes the given XP amount from this `Character`.
   *
   * @param xp The amount of XP to remove
   */
  public removeXP (xp: number): void {
    this.xp -= xp;
  }

  /**
   * Adds the provided `LifeModule` to this character as an affiliation. The
   * `LifeModule` provided will become this characters latest (i.e. active)
   * affiliation.
   *
   * @param lm The `LifeModule` to add to this character.
   */
  public addAffiliation (lm: LifeModule): void {
    this.addLifeModule(LifeStage.AFFILIATION, lm);
  }

  /**
   * Adds the provided `LifeModule` at the given `LifeStage` of this
   * character's life. These will be constructed into  a `CharacterLifeModule`
   * and if the optional field is provided it will be associated with the
   * `CharacterLifeModule`.
   *
   * @param stage The stage to take this `LifeModule` for
   * @param lm The `LifeModule` to use
   * @param [field] Optional: a field to be associated with this module
   */
  public addLifeModule (stage: LifeStage, lm: LifeModule, field?: string): void {
    // Can't take the same affiliation twice
    if (stage === LifeStage.AFFILIATION) {
      const alreadyTaken = this._lifeModules.filter(
        l => l.stage === stage && l.name === lm.name
      ).length > 0;

      if (alreadyTaken) {
        return;
      }
    }

    const module = new CharacterLifeModule(stage, lm);
    if (field) {
      module.fields.push(field);
    }

    this._lifeModules.push(module);

    // If the `LifeModule` being added is an affiliation make sure that the
    // _affiliations array gets re-cached.
    if (lm.stage === LifeStage.AFFILIATION) {
      this._affiliations = [];
      this.affiliations();
    }
  }

  /**
   * A list of a characters affiliations. This method utilizes a cache.
   */
  public affiliations (): CharacterLifeModule[] {
    if (this._affiliations.length === 0) {
      this._affiliations = this._lifeModules.filter(
        lm => lm.stage === LifeStage.AFFILIATION
      );

      return this._affiliations;
    } else {

      return this._affiliations;
    }
  }

  /**
   * Adds the given amount of XP to this character's `Attribute`.
   *
   * @param attr The attribute to add the XP to
   * @param xp The amount of XP that's being added
   */
  public addAttributeXP (attr: Attribute, xp: number): void {
    this.attributes.addXP(xp, attr);
  }

  /**
   * Removes the given amount of XP from this character's `Attribute`.
   *
   * @param attr The attribute to add the XP to
   * @param xp The amount of XP that's being added
   */
  public removeAttributeXP (attr: Attribute, xp: number): void {
    this.attributes.removeXP(xp, attr);
  }

  /**
   * Checks if this character has a trait by the provided name.
   *
   * @param name The name of the trait to check for
   */
  public hasTrait (name: string): boolean {
    return !!this.getTrait(name);
  }

  /**
   * Gets the trait of this character by the provided name.
   *
   * @param name The name of the trait to get
   */
  public getTrait (name: string): Trait {
    return this.traits.find(t => t.name === name);
  }

  /**
   * Returns all of this character's skills in stringified form.
   */
  public skillStrings (): string[] {
    return this.skills.map(toString);
  }

  /**
   * Returns all of this character's traits in stringified form.
   */
  public traitStrings (): string[] {
    return this.traits.map(toString);
  }
}

