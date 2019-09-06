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

