import { deepCopy } from "../../Utils/objects";

export interface Trait {
    /** The name of the `Trait` */
    name: string;
    /** The amount of Trait Points or TP a trait has. */
    points: number;
    /** The amount of raw XP a trait has. */
    experience: number;
    /** If a character is allowed to to multiple of this trait. */
    multipleAllowed: boolean;
    /**
     * A further description of a trait, usually to differentiate a trait taken
     * multiple times.
     */
    subDescription?: string;
    /**
     * Further clarification on a `subDescription`. This is useful in
     * situations where there's multiple of the same thing. i.e:
     *   Dependent (-2)/Son (Albert)
     *   Dependent (-2)/Son (Brent)
     */
    subject?: string;
    /**
     * If a character has multiple identities, this specifies which of those
     * identities this belongs to.
     */
    identity?: string;
    /** The minimum `points` this trait can have. */
    min?: number;
    /** The maximum `points` this trait can have. */
    max?: number;
}

/**
 * Determines if a `Trait` is currently active on the character it belongs to.
 *
 * @param t The trait to test
 * @returns if the trait is actively effecting the character
 */
export const isActive = (t: Trait): boolean => t.points !== 0;

export const newTrait = (): Trait => ({
    name: '',
    points: 0,
    experience: 0,
    multipleAllowed: false,
});

export const calculatePoints = (xp: number) => Math.floor(xp / 100);

export const changeXP = (t: Trait, newXP: number): Trait => {
    const trait = deepCopy(t);
    let points = calculatePoints(newXP);
    trait.experience = newXP;
    if (t.max) {
        points = points > t.max ? t.max : points;
    }
    trait.points = points;

    return trait;
};

export const toString = (t: Trait): string => {
    let str = t.name;
    if (isActive(t)) {
        str = `${str} (${t.points})`;
    }
    if (t.subDescription) {
        str = `${str}/${t.subDescription}`;
    }
    if (t.subject) {
        str = `${str} (${t.subject})`;
    }

    return str;
};
