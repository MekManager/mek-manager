import { map } from "ramda";
import { Attributes, newAttributes } from "./attributes";
import { CharacterFlavor, newCharacterFlavor } from './characterFlavor';
import { Skill } from "./skills";
import { Trait } from "./traits";

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

