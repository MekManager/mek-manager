import { expect } from "chai";
import "mocha";
import { adder } from "../adder";

describe("running tests", () => {
  it("should work", () => {
    const expectation = 2;
    expect(adder(1, 1)).to.equal(expectation);
  });
});
