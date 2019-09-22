import { Experience, Stringify } from '../interfaces';
import { findLastIndex } from '../Utils/collections';
import { Attribute } from './attribute';
import { Learning, xpList } from './learning';
import { SkillBase } from './skillBase';

// TODO: write more documentation for this
export class Skill implements Experience, Stringify {
  public readonly base: SkillBase;
  public level: number;
  public xp: number;
  // NOTE: this might benefit from stricter typing.
  public subSkill?: string;
  public specialty?: string;
  public complexity: string;
  public links: Attribute | Attribute[];
  public targetNumber: number;

  constructor (base: SkillBase) {
    this.base = base;
  }

  public addXP (xp: number, l: Learning): void {
    this.xp += xp;
    this._recalculate(l);
  }

  public removeXP (xp: number, l: Learning): void {
    this.xp -= xp;
    this._recalculate(l);
  }

  public setXP (xp: number, l: Learning): void {
    this.xp = xp;
    this._recalculate(l);
  }

  public toString (): string {
    let str = this.base.name;
    if (this.subSkill) {
      str = `${str}/${this.subSkill}`;
    }
    if (this.specialty) {
      str = `${str} (${this.specialty})`;
    }

    return str;
  }

  /**
   * A `Skill` has several properties that need to be calculated based on it's
   * XP. Like other objects that require re-calculating, the order that these
   * happen has some degree of importance. This ensures it happens in the right
   * order.
   *
   * @param l The learning of the character this skill belongs to
   */
  private _recalculate (l: Learning) {
    this._calculateLevel(l);
    this._calculateComplexity();
    this._calculateLinks();
    this._calculateTargetNumber();
  }

  /**
   * Determines and sets the level for the skill based on it's current XP.
   */
  private _calculateLevel (l: Learning): number {
    const value = findLastIndex((n) => this.xp >= n, xpList(l));
    this.level = value;

    return value;
  }

  private _calculateComplexity (): void {
    this.complexity = this._tieredValue<string>(this.base.complexityRatings);
  }

  private _calculateLinks (): void {
    this.links = this._tieredValue<Attribute | Attribute[]>(
      this.base.linkedAttributes
     );
  }

  private _calculateTargetNumber (): void {
    this.targetNumber = this._tieredValue<number>(this.base.targetNumbers);
  }

  /**
   * This method is kinda tricky to understand.
   *
   * Some skills are "tiered"; which means that once the skill achieves a level
   * of 3 or higher it has different complexity, link values, and target
   * numbers. These are obviously three completely different values though,
   * so this method exists to generically determine if a tier needs to be used
   * and if so which one; and then return the appropriate value.
   *
   * @param subject The type of tiered value to be
   */
  private _tieredValue<T> (subject: T[]): T {
    if (this.base.tiered) {
      return this.level <= 3 ? subject[0] : subject[1];
    } else {
      return subject[0];
    }
  }
}
