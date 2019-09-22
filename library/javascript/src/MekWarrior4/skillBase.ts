import { Attribute } from './attribute';

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
