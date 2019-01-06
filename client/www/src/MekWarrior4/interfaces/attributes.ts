/**
 * Keys for each of the eight Attribues in MekWarrior4.
 */
export enum Attribute {
    /** A measure of a character's raw muscle power. */
    STR = 'Strength',
    /** A measure of how sturdy or in-shape a character is. */
    BOD = 'Body',
    /** A measure of a character's swiftness and reaction time. */
    RFL = 'Reflexes',
    /** A measure of a character's fine motor control. */
    DEX = 'Dexterity',
    /** A measure of a character's brainpower, like memory and higher reasoning */
    INT = 'Intelligence',
    /** A measure of a character's bravery and ability to think for themselves */
    WIL = 'Willpower',
    /** A measure of a character's personal appeal. */
    CHA = 'Charisma',
    /** A measure of a character's raw luck. */
    EDG = 'Edge',
}

/**
 * Describes the values that are associated with an attribute.
 */
export interface AttributeValues {
    score: number;
    link: number;
    xp: number;
}

/**
 * A type representing the mapping between attribute keys and attribute value
 * objects.
 */
export type Attributes = Map<Attribute, AttributeValues>;

/**
 * A factory function to create a new set of `Attributes` with all values being
 * set to an empty `AttributeValues` object.
 */
export const emptyAttributes = (): Attributes => {
    const attrs: Attributes = new Map();
    const empty = emptyAttributeValues();

    attrs.set(Attribute.STR, empty);
    attrs.set(Attribute.BOD, empty);
    attrs.set(Attribute.RFL, empty);
    attrs.set(Attribute.DEX, empty);
    attrs.set(Attribute.INT, empty);
    attrs.set(Attribute.WIL, empty);
    attrs.set(Attribute.CHA, empty);
    attrs.set(Attribute.EDG, empty);

    return attrs;
};

/**
 * A factory function to create a new `AttributeValues` object where all values
 * are set to 0.
 */
export const emptyAttributeValues = (): AttributeValues => ({
    score: 0,
    link: calculateLinkValue(0),
    xp: 0,
});

/**
 * Takes the score of an `AttributeValues` object and determines the link
 * modifier for it.
 *
 * @param value the score for an attribute
 * @returns the link value for an `AttributeValues` object.
 */
export const calculateLinkValue = (value: number): number => {
    if (value === 0) {
        return -4;
    } else if (value === 1) {
        return -2;
    } else if (value >= 2 && value <= 3) {
        return -1;
    } else if (value >= 4 && value <= 6) {
        return 0;
    } else if (value >= 7 && value <= 9) {
        return 1;
    } else if (value === 10) {
        return 2;
    } else {
        const buff = Math.floor(value / 3);

        return buff > 5 ? 5 : buff;
    }
};
