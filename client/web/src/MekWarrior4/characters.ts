import { map } from "ramda";
import { Attributes, newAttributes } from "./attributes";
import { Skill } from "./skills";
import { Trait } from "./traits";

export interface CharacterFlavor {
  /** A character's height, in centimeters. */
  height: number;
  /** A character's weight, in kilograms. */
  weight: number;
  /** A character's hair color. */
  hair: string;
  /** A character's eye color. */
  eyes: string;
  biography: string;
}

export const newCharacterFlavor = () => ({
  height: 170, // Roughly 5' 7"
  weight: 79, // Roughly 175lbs
  hair: '',
  eyes: '',
  biography: '',
});

export class Character {
  // TODO: names should have more to them than just being a single string.
  public name: string;
  public flavor: CharacterFlavor;
  public attributes: Attributes;
  public skills: Skill[];
  public traits: Trait[];

  constructor () {
    this.name = '';
    this.flavor = newCharacterFlavor();
    this.attributes = newAttributes();
    this.skills = [] as Skill[];
    this.traits = [] as Trait[];
  }

  public traitStrings (): string[] {
    return map(t => t.toString(), this.traits);
  }

  public skillStrings (): string[] {
    return map(s => s.toString(), this.skills);
  }
}

