import { Experience } from '../interfaces';

/**
 * Describes the values that are associated with an attribute.
 */
export class AttributeValues implements Experience {
  /** The score of an attribute based on how much XP it has. */
  public score: number;
  public link: number;
  /** The amount of XP that has been spent on this attribute. */
  public xp: number;

  constructor (values?: AttributeValues) {
    if (values) {
      this.setXP(values.xp);
    } else {
      this.setXP(0);
    }
  }

  /**
   * Sets these attribute values to the exact amount of XP provided. Then
   * recalculates `score` and `link`.
   *
   * @param xp The value to set `xp` to
   */
  public setXP (xp: number): void {
    this.xp = xp;
    this._recalculate();
  }

  /**
   * Adds the given amount of XP and recalculates `score` and `link`.
   *
   * @param xp The amount of XP to be added
   */
  public addXP (xp: number): void {
    this.xp += xp;
    this._recalculate();
  }

  /**
   * Removes the given amount of XP and recalculates `score` and `link`.
   *
   * @param xp The amount of XP to be removed
   */
  public removeXP (xp: number): void {
    this.xp -= xp;
    this._recalculate();
  }

  /**
   * Re-calculates the `score` and `link` values. Getting the correct values
   * for them is dependent on running them in the right order. This helps
   * ensure that order is preserved.
   */
  private _recalculate (): void {
    this._calculateScore();
    this._calculateLink();
  }

  private _calculateScore (): number {
    this.score = Math.floor(this.xp / 100);

    return this.score;
  }

  private _calculateLink (): number {
    if (this.score === 0) {
      this.link = -4;
    }
    else if (this.score === 1) {
      this.link = -2;
    }
    else if (this.score >= 2 && this.score <= 3) {
      this.link = -1;
    }
    else if (this.score >= 4 && this.score <= 6) {
      this.link = 0;
    }
    else if (this.score >= 7 && this.score <= 9) {
      this.link = 1;
    }
    else if (this.score === 10) {
      this.link = 2;
    }
    else {
      const buff = Math.floor(this.score / 3);
      this.link = buff > 5 ? 5 : buff;
    }

    return this.link;
  }
}
