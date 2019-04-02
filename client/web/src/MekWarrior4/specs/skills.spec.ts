import { expect } from "chai";
import "mocha";
import { Attribute } from "../attributes";
import { Learning } from '../learning';
import { Skill, SkillBase } from "../skills";

describe("calculating levels", () => {
  const base = new SkillBase({
    targetNumbers: [8],
    complexityRatings: ["CB"],
    linkedAttributes: [Attribute.INT],
    tiered: false,
  });
  const skill = new Skill(base);

  describe("Fast learning", () => {
    const learning = Learning.FAST;

    it("should be level 0 with 18XP", () => {
      skill.setXP(learning, 18);
      expect(skill.level).to.equal(0);
    });

    it("should be level 0 with 20XP", () => {
      skill.setXP(learning, 20);
      expect(skill.level).to.equal(0);
    });

    it("should be level 5 with 153XP", () => {
      skill.setXP(learning, 153);
      expect(skill.level).to.equal(5);
    });

    it("should be level 5 with 160XP", () => {
      skill.setXP(learning, 160);
      expect(skill.level).to.equal(5);
    });

    it("should be level 10 with 513XP", () => {
      skill.setXP(learning, 513);
      expect(skill.level).to.equal(10);
    });
  });

  describe("Standard learning", () => {
    const learning = Learning.STANDARD;

    it("should be level 0 with 20XP", () => {
      skill.setXP(learning, 20);
      expect(skill.level).to.equal(0);
    });

    it("should be level 0 with 25XP", () => {
      skill.setXP(learning, 25);
      expect(skill.level).to.equal(0);
    });

    it("should be level 5 with 170XP", () => {
      skill.setXP(learning, 170);
      expect(skill.level).to.equal(5);
    });

    it("should be level 5 with 180XP", () => {
      skill.setXP(learning, 180);
      expect(skill.level).to.equal(5);
    });

    it("should be level 10 with 570XP", () => {
      skill.setXP(learning, 570);
      expect(skill.level).to.equal(10);
    });
  });

  describe("Slow learning", () => {
    const learning = Learning.SLOW;

    it("should be level 0 with 22XP", () => {
      skill.setXP(learning, 22);
      expect(skill.level).to.equal(0);
    });

    it("should be level 0 with 26XP", () => {
      skill.setXP(learning, 26);
      expect(skill.level).to.equal(0);
    });

    it("should be level 5 with 187XP", () => {
      skill.setXP(learning, 187);
      expect(skill.level).to.equal(5);
    });

    it("should be level 5 with 190XP", () => {
      skill.setXP(learning, 190);
      expect(skill.level).to.equal(5);
    });

    it("should be level 10 with 627XP", () => {
      skill.setXP(learning, 627);
      expect(skill.level).to.equal(10);
    });
  });
});

describe("Changing XP on a skill", () => {
  const learning = Learning.STANDARD;
  const baseXP = 80;
  const base = new SkillBase({
    name: 'Computers',
    targetNumbers: [8, 9],
    complexityRatings: ["CB", "CA"],
    tiered: true,
    linkedAttributes: [Attribute.INT, [Attribute.DEX, Attribute.INT]],
  });
  const skill = new Skill(base);
  skill.setXP(learning, baseXP);


  it("should have the basic tier traits below skill level 3", () => {
    expect(skill.level).to.equal(3);
    expect(skill.targetNumber).to.equal(8);
    expect(skill.complexity).to.equal("CB");
    expect(skill.links).to.equal(Attribute.INT);
  });

  it("should have the advanced tier traits at level 4 or above", () => {
    skill.setXP(learning, baseXP + 40);

    expect(skill.experience).to.equal(120);
    expect(skill.level).to.equal(4);
    expect(skill.targetNumber).to.equal(9);
    expect(skill.complexity).to.equal("CA");
    expect(skill.links).to.deep.equal([Attribute.DEX, Attribute.INT]);
  });
});
