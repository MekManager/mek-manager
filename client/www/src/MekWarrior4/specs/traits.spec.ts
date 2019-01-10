import { expect } from "chai";
import "mocha";
import {
    calculatePoints,
    changeXP,
    isActive,
    newTrait,
    toString
} from "../interfaces/traits";

describe("Traits", () => {
    it("should have a way to create an empty trait", () => {
        const trait = newTrait();

        expect(trait.name).to.exist;
        expect(trait.level).to.be.a('number');
        expect(trait.experience).to.be.a('number');
        expect(trait.multipleAllowed).to.equal(false);
    });

    describe("Changing XP", () => {
        it("should update the XP and points of a trait", () => {
            const trait = changeXP(newTrait(), 325);

            expect(trait.level).to.equal(3);
            expect(trait.experience).to.equal(325);
        });
    });

    describe("Calculating point values", () => {
        it("should be equal to XP divided by 100, rounded down", () => {
            const xp = calculatePoints(newTrait(), 200);

            expect(xp).to.equal(2);
        });

        it("should clamp the points to the max value, if there is one", () => {
            const trait = newTrait();
            trait.max = 5;
            const xp = calculatePoints(trait, 600);

            expect(xp).to.equal(5);
        });

        it("should return 0 if there's not enough XP for the minimum value", () => {
            const trait = newTrait();
            trait.min = 2;
            const xp = calculatePoints(trait, 100);

            expect(xp).to.equal(0);
        });
    });

    describe("Active state", () => {
        it("should not be active if it has 0 points", () => {
            expect(isActive(newTrait())).to.equal(false);
        });
        it("should be active if it has a positive number of points", () => {
            const trait = newTrait();
            trait.level = 3;

            expect(isActive(trait)).to.equal(true);
        });
        it("should be active if it has a negative number of points", () => {
            const trait = newTrait();
            trait.level = -2;

            expect(isActive(trait)).to.equal(true);
        });
    });

    describe("Stringifying", () => {
        const traitName = "Coolness";
        const subDesc = "Sunglasses";
        const subject = "Aviators";
        const pointValue = 2;

        it("should include the trait's name, at minimum", () => {
            const trait = newTrait();
            trait.name = traitName;

            expect(toString(trait)).to.equal(traitName);
        });

        it("should include the point value, if the trait is active", () => {
            const trait = newTrait();
            trait.name = traitName;
            trait.level = pointValue;

            expect(toString(trait)).to.equal(`${traitName} (${pointValue})`);
        });

        it("should include the sub-description, if there is one", () => {
            const trait = newTrait();
            trait.name = traitName;
            trait.level = pointValue;
            trait.subDescription = subDesc;

            expect(toString(trait))
                .to
                .equal(`${traitName} (${pointValue})/${subDesc}`);
        });

        it("should include the subject, if there is one", () => {
            const trait = newTrait();
            trait.name = traitName;
            trait.level = pointValue;
            trait.subDescription = subDesc;
            trait.subject = subject;

            expect(toString(trait))
                .to
                .equal(`${traitName} (${pointValue})/${subDesc} (${subject})`);
        });
    });
});
