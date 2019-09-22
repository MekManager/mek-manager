import { Experience, Stringify } from '../interfaces';
import { LifeStage } from './lifeStage';
import { TraitBase } from './traitBase';

export class Trait implements Experience, Stringify {
  public readonly base: TraitBase;
  /** The amount of Trait Points or TP a trait has. */
  public level: number;
  /** The amount of raw XP a trait has. */
  public xp: number;
  /**
   * A further description of a trait, usually to differentiate a trait taken
   * multiple times.
   */
  public subDescription?: string;
  /**
   * Further clarification on a `subDescription`. This is useful in
   * situations where there's multiple of the same thing. i.e:
   *
   *   Dependent (-2)/Son (Albert)
   *
   *   Dependent (-2)/Son (Brent)
   */
  public subject?: string;
  /**
   * If a character has multiple identities, this specifies which of those
   * identities this belongs to.
   */
  public identity?: string;
  /**
   * This is a special field related to phenotypes
   */
  public type?: string;
  /**
   * The stage this trait was assigned to the character.
   */
  public stageTaken?: LifeStage;

  constructor (base: TraitBase) {
    this.base = base;
    this.level = this._calculatePoints(0);
  }

/**
 * Determines if this `Trait` is currently active.
 *
 * @returns if the trait is actively effecting a character
 */
  get isActive (): boolean {
    return this.level !== 0;
  }

  /**
   * The base name of this `Trait`.
   */
  get name (): string {
    return this.base.name;
  }

  /**
   * Adds the given amount of XP to be added to this `Trait`.
   *
   * @param xp The amount of XP to add
   */
  public addXP (xp: number): void {
    this.xp = xp;
    this.level = this._calculatePoints(xp);
  }

  /**
   * Sets the XP of this `Trait` to the given amount.
   *
   * @param xp The amount of XP to set
   */
  public setXP (xp: number): void {
    this.xp = xp;
    this.level = this._calculatePoints(xp);
  }

  /**
   * Removes the given amount of XP from this `Trait`.
   *
   * @param xp The amount of XP to remove
   */
  public removeXP (xp: number): void {
    this.xp = xp;
    this.level = this._calculatePoints(xp);
  }

  /**
   * The string representation of this `Trait`.
   */
  public toString (): string {
    let str = this.base.name;

    if (this.type) {
      str =`${str}: ${this.type}`;
    }
    if (this.isActive) {
      str = `${str} (${this.level})`;
    }
    if (this.subDescription) {
      str = `${str}/${this.subDescription}`;
    }
    if (this.subject) {
      str = `${str} (${this.subject})`;
    }

    return str;
  }

  private _calculatePoints (xp: number): number {
    const points = Math.floor(xp / 100);

    if (this.base.max && points > this.base.max) {
      return this.base.max;
    } else if (this.base.min && points < this.base.min) {
      return 0;
    } else {
      return points;
    }
  }
}
