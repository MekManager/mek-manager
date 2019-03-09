import { map } from "ramda";
import { Attributes, newAttributes } from "./attributes";
import {
    Skill,
    toString as skillToString
} from "./skills";
import {
    toString as traitToString,
    Trait
} from "./traits";

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

export interface Character {
    // TODO: names should have more to them than just being a single string.
    name: string;
    flavor: CharacterFlavor;
    attributes: Attributes;
    skills: Skill[];
    traits: Trait[];
}

export const newCharacterFlavor = () => ({
    height: 170, // Roughly 5' 7"
    weight: 79, // Roughly 175lbs
    hair: '',
    eyes: '',
    biography: '',
});

export const newCharacter = () => ({
    name: '',
    flavor: newCharacterFlavor(),
    attributes: newAttributes(),
    skills: [] as Skill[],
    traits: [] as Trait[],
});

export const traitStrings = (c: Character) => map(traitToString, c.traits);
export const skillStrings = (c: Character) => map(skillToString, c.skills);
