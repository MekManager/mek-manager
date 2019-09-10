import { Attribute, Skill, SkillBase } from '../../MekWarrior4';

export const basicBase = new SkillBase({
  targetNumbers: [8],
  complexityRatings: ['CB'],
  linkedAttributes: Attribute.INT,
  tiered: false,
});

export const tieredBase = new SkillBase({
  name: 'Computers',
  targetNumbers: [8, 9],
  complexityRatings: ['CB', 'CA'],
  tiered: true,
  linkedAttributes: [Attribute.INT, [Attribute.DEX, Attribute.INT]],
});

export const basicSkill = new Skill(basicBase);
export const tieredSkill = new Skill(tieredBase);
