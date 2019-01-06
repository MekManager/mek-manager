import { expect } from "chai";
import "mocha";
import {
    Attribute,
    calculateLinkValue,
    emptyAttributes,
    emptyAttributeValues,
} from "../interfaces/attributes";

describe("Attributes", () => {
    it("should create an empty attribute set", () => {
        const attrs = emptyAttributes();
        const emptyValues = emptyAttributeValues();

        expect(attrs.get(Attribute.STR)).to.deep.equal(emptyValues);
        expect(attrs.get(Attribute.BOD)).to.deep.equal(emptyValues);
        expect(attrs.get(Attribute.RFL)).to.deep.equal(emptyValues);
        expect(attrs.get(Attribute.DEX)).to.deep.equal(emptyValues);
        expect(attrs.get(Attribute.INT)).to.deep.equal(emptyValues);
        expect(attrs.get(Attribute.WIL)).to.deep.equal(emptyValues);
        expect(attrs.get(Attribute.CHA)).to.deep.equal(emptyValues);
        expect(attrs.get(Attribute.EDG)).to.deep.equal(emptyValues);
    });

    describe("Link modifiers", () => {
        it("should be a crippling de-buff for a minimum score", () => {
            const score = calculateLinkValue(0);
            const linkValue = -4;

            expect(score).to.equal(linkValue);
        });

        it("should be a major de-buff for a very low score", () => {
            const score = calculateLinkValue(1);
            const linkValue = -2;

            expect(score).to.equal(linkValue);
        });
        it("should be a minor de-buff for a below average score", () => {
            const score = calculateLinkValue(2);
            const linkValue = -1;

            expect(score).to.equal(linkValue);
        });
        it("should have no buff or de-buff for an average score", () => {
            const score = calculateLinkValue(5);
            const linkValue = 0;

            expect(score).to.equal(linkValue);
        });
        it("should be a minor buff for an above average score", () => {
            const score = calculateLinkValue(8);
            const linkValue = 1;

            expect(score).to.equal(linkValue);
        });
        it("should be a major buff for a very high score", () => {
            const score = calculateLinkValue(10);
            const linkValue = 2;

            expect(score).to.equal(linkValue);
        });
        it("should be an overwhelming buff for a super-human score", () => {
            const score = calculateLinkValue(11);
            const linkValue = 3;

            expect(score).to.equal(linkValue);
        });
        it("should cap off at a buff of 5", () => {
            const score = calculateLinkValue(18);
            const linkValue = 5;

            expect(score).to.equal(linkValue);
        });
    });

});
