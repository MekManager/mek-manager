import { findLastIndex } from 'ramda';
import { Attribute } from './attributes';
import { Learning, xpList } from './learning';

export class SkillBase {
  public readonly name: string;
  public readonly targetNumbers: [number, number?];
  // TODO: There should probably be some type representing complexity ratings
  public readonly complexityRatings: [string, string?];
  public readonly linkedAttributes: [Attribute, [Attribute, Attribute]?];
  public readonly tiered: boolean;

  constructor (data: Object) {
    this.name = data['name'];
    this.targetNumbers = data['targetNumbers'];
    this.complexityRatings = data['complexityRatings'];
    this.linkedAttributes = data['linkedAttributes'];
    this.tiered = data['tiered'];
  }
}

// TODO: write more documentation for this
export class Skill {
  public readonly base: SkillBase;
  public level: number;
  public experience: number;
  // NOTE: this might benefit from stricter typing.
  public subSkill?: string;
  public specialty?: string;
  public complexity: string;
  public links: Attribute | Attribute[];
  public targetNumber: number;

  constructor (base: SkillBase) {
    this.base = base;
  }

  public setXP (l: Learning, xp: number): void {
    this.experience = xp;
    this._calculateLevel(l);
    this._calculateComplexity();
    this._calculateLinks();
    this._calculateTargetNumber();
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


  private _calculateComplexity (): string {
    const value = this._tieredValue<string>(this.base.complexityRatings);
    this.complexity = value;

    return value;
  }

  /**
   * Determines and sets the level for the skill based on it's current XP.
   */
  private _calculateLevel (l: Learning): number {
    const value = findLastIndex((n: number) =>
      this.experience >= n, xpList(l));
    this.level = value;

    return value;
  }

  private _calculateLinks (): Attribute | Attribute[] {
    const value = this._tieredValue<Attribute | Attribute[]>(
      this.base.linkedAttributes
     );
     this.links = value;

     return value;
  }

  private _calculateTargetNumber (): number {
    const value = this._tieredValue<number>(this.base.targetNumbers);
    this.targetNumber = value;

    return value;
  }

  private _tieredValue<T> (tieredSubject: T[]): T {
    if (this.base.tiered) {
      return this.level <= 3
        ? tieredSubject[0]
        : tieredSubject[1];
    } else {
      return tieredSubject[0];
    }
  }
}

