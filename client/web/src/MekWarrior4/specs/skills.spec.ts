import { expect } from "chai";
import "mocha";
import { Attribute } from "../attributes";
import {
  changeXP,
  complexity,
  fastXP,
  Learning,
  levelForXP,
  links,
  Skill,
  slowXP,
  targetNumber,
} from "../skills";

describe("Skills", () => {
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

  describe("calculating levels", () => {
    describe("Fast learning", () => {
      const learning = Learning.FAST;

      it("should be level 0 with 18XP", () => {
        const value = levelForXP(learning, 18);
        expect(value).to.equal(0);
      });

      it("should be level 0 with 20XP", () => {
        const value = levelForXP(learning, 20);
        expect(value).to.equal(0);
      });

      it("should be level 5 with 153XP", () => {
        const value = levelForXP(learning, 153);
        expect(value).to.equal(5);
      });

      it("should be level 5 with 160XP", () => {
        const value = levelForXP(learning, 160);
        expect(value).to.equal(5);
      });

      it("should be level 10 with 513XP", () => {
        const value = levelForXP(learning, 513);
        expect(value).to.equal(10);
      });
    });

    describe("Standard learning", () => {
      const learning = Learning.STANDARD;

      it("should be level 0 with 20XP", () => {
        const value = levelForXP(learning, 20);
        expect(value).to.equal(0);
      });

      it("should be level 0 with 25XP", () => {
        const value = levelForXP(learning, 25);
        expect(value).to.equal(0);
      });

      it("should be level 5 with 170XP", () => {
        const value = levelForXP(learning, 170);
        expect(value).to.equal(5);
      });

      it("should be level 5 with 180XP", () => {
        const value = levelForXP(learning, 180);
        expect(value).to.equal(5);
      });

      it("should be level 10 with 570XP", () => {
        const value = levelForXP(learning, 570);
        expect(value).to.equal(10);
      });
    });

    describe("Slow learning", () => {
      const learning = Learning.SLOW;

      it("should be level 0 with 22XP", () => {
        const value = levelForXP(learning, 22);
        expect(value).to.equal(0);
      });

      it("should be level 0 with 26XP", () => {
        const value = levelForXP(learning, 26);
        expect(value).to.equal(0);
      });

      it("should be level 5 with 187XP", () => {
        const value = levelForXP(learning, 187);
        expect(value).to.equal(5);
      });

      it("should be level 5 with 190XP", () => {
        const value = levelForXP(learning, 190);
        expect(value).to.equal(5);
      });

      it("should be level 10 with 627XP", () => {
        const value = levelForXP(learning, 627);
        expect(value).to.equal(10);
      });
    });
  });

  describe("Changing XP on a skill", () => {
    const baseXP = 80;
    const learning = Learning.STANDARD;
    const skill: Skill = {
      name: 'Computers',
      targetNumbers: [8, 9],
      tiered: true,
      complexityRatings: ["CB", "CA"],
      linkedAttributes: [Attribute.INT, [Attribute.DEX, Attribute.INT]],
      experience: baseXP,
      level: levelForXP(learning, baseXP),
    };

    it("should have the basic tier traits below skill level 3", () => {
      expect(skill.level).to.equal(3);
      expect(targetNumber(skill)).to.equal(8);
      expect(complexity(skill)).to.equal("CB");
      expect(links(skill)).to.equal(Attribute.INT);
    });

    it("should have the advanced tier traits at level 4 or above", () => {
      const higherSkill = changeXP({ ...skill }, learning, 40);

      expect(higherSkill.experience).to.equal(120);
      expect(higherSkill.level).to.equal(4);
      expect(targetNumber(higherSkill)).to.equal(9);
      expect(complexity(higherSkill)).to.equal("CA");
      expect(links(higherSkill))
        .to.deep.equal([Attribute.DEX, Attribute.INT]);
    });
  });
});
