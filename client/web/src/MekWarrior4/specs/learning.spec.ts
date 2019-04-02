import { expect } from "chai";
import "mocha";
import {
  fastXP,
  slowXP,
} from '../learning';

describe("XP lists", () => {
  it("should calculate the first fast value", () => {
    const value = fastXP[0];

    expect(value).to.equal(18);
  });

  it("should calculate the middle fast value", () => {
    const value = fastXP[5];

    expect(value).to.equal(153);
  });

  it("should calculate the last fast value", () => {
    const value = fastXP[10];

    expect(value).to.equal(513);
  });

  it("should calculate the first slow value", () => {
    const value = slowXP[0];

    expect(value).to.equal(22);
  });

  it("should calculate the middle slow value", () => {
    const value = slowXP[5];

    expect(value).to.equal(187);
  });

  it("should calculate the last slow value", () => {
    const value = slowXP[10];

    expect(value).to.equal(627);
  });
});
