import { LifeStage } from './lifeStage';

export class TraitBase {
  /** The name of the `Trait` */
  public readonly name: string;
  /** If a character is allowed to have multiple of this trait. */
  public readonly multipleAllowed: boolean;
  /** The maximum `points` this trait can have. */
  public readonly max?: number;
  /** The minimum `points` this trait can have. */
  public readonly min?: number;

  constructor (data: Object) {
    this.name = data['name'] || '';
    this.multipleAllowed = data['multipleAllowed'] || false;
    this.max = data['max'];
    this.min = data['min'];
  }
}

export class Trait {
  public readonly base: TraitBase;
  /** The amount of Trait Points or TP a trait has. */
  public level: number;
  /** The amount of raw XP a trait has. */
  public experience: number;
  /**
   * A further description of a trait, usually to differentiate a trait taken
   * multiple times.
   */
  public subDescription?: string;
  /**
   * Further clarification on a `subDescription`. This is useful in
   * situations where there's multiple of the same thing. i.e:
   *   Dependent (-2)/Son (Albert)
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
  public isActive (): boolean {
    return this.level !== 0;
  }

  public name (): string {
    return this.base.name;
  }

  // NOTE: Why do traits have their XP set, but skills have their XP added?
  public setXP (newXP: number): void {
    this.experience = newXP;
    this.level = this._calculatePoints(newXP);
  }

  public toString (): string {
    let str = this.base.name;

    if (this.type) {
      str =`${str}: ${this.type}`;
    }
    if (this.isActive()) {
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
