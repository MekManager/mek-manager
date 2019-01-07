import { deepCopy } from "../../Utils/objects";

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
 * A function to act as the constructor for the `Attributes` type. If nothing
 * is provided, an empty set of `Attributes` will be generated. If another set
 * of `Attributes` are provided they will be deeply copied.
 *
 * @param attrs The `Attributes` to be shallow copied, or nothing.
 * @returns a new set of `Attributes`.
 */
export const newAttributes = (attrs?: Attributes | undefined): Attributes => {
    const newAttrs: Attributes = new Map();
    /* NOTE: This function body looks like a mess. And I have concerns about
     * the performance of the copy constructor. Keep an eye on it.
     */
    if (attrs) {
        newAttrs.set(Attribute.STR, deepCopy(attrs.get(Attribute.STR)));
        newAttrs.set(Attribute.BOD, deepCopy(attrs.get(Attribute.BOD)));
        newAttrs.set(Attribute.RFL, deepCopy(attrs.get(Attribute.RFL)));
        newAttrs.set(Attribute.DEX, deepCopy(attrs.get(Attribute.DEX)));
        newAttrs.set(Attribute.INT, deepCopy(attrs.get(Attribute.INT)));
        newAttrs.set(Attribute.WIL, deepCopy(attrs.get(Attribute.WIL)));
        newAttrs.set(Attribute.CHA, deepCopy(attrs.get(Attribute.CHA)));
        newAttrs.set(Attribute.EDG, deepCopy(attrs.get(Attribute.EDG)));
    } else {
        const empty = emptyAttributeValues();
        newAttrs.set(Attribute.STR, empty);
        newAttrs.set(Attribute.BOD, empty);
        newAttrs.set(Attribute.RFL, empty);
        newAttrs.set(Attribute.DEX, empty);
        newAttrs.set(Attribute.INT, empty);
        newAttrs.set(Attribute.WIL, empty);
        newAttrs.set(Attribute.CHA, empty);
        newAttrs.set(Attribute.EDG, empty);
    }

    return newAttrs;
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
 * A function to alter the XP of an `Attribute` set. Given a `target` it will
 * change it by the provided `newXP` value; `newXP` can be either a positive or
 * negative number. Then the score and link value of the `attrs` will be
 * recalculated in a new copy.
 *
 * @param attrs the `Attributes` set being updated
 * @param target the `Attribute` to be changed in the `Attributes` set
 * @param newXP the amount to change the attribute's XP by (can be negative)
 * @returns A new copy of `attrs` with the `target` updated.
 */
export const changeXP = (
    attrs: Attributes,
    target: Attribute,
    newXP: number): Attributes => {
    const newAttrs = newAttributes(attrs);
    const currentValues = newAttrs.get(target);

    const xp = currentValues.xp + newXP;
    const score = calculateScore(xp);
    const link = calculateLinkValue(score);
    newAttrs.set(target, { score, link, xp });

    return newAttrs;
};

/**
 *
 * @param xp the anount of experience to be converted
 * @returns the score computed from the provided XP.
 */
export const calculateScore = (xp: number): number => Math.floor(xp / 100);

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
