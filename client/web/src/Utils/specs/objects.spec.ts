import { expect } from "chai";
import "mocha";
import { deepCopy } from "../objects";

describe("Object utility functions", () => {
    it("can make a deep copy of an object", () => {
        const original = {
            a: {
                b: 1,
            },
        };
        const copy = deepCopy(original);
        copy.a.b = 3;
        expect(original.a.b).to.equal(1);
        expect(copy.a.b).to.equal(3);
    });
});
