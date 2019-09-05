export const standardXP: number[] = [20, 30, 50, 80, 120, 170, 230, 300, 380, 470, 570];
export const fastXP: number[] = standardXP.map(x => Math.floor(x * 0.9));
export const slowXP: number[] = standardXP.map(x => Math.floor(x * 1.1));

export enum Learning {
  FAST = 'Fast',
  STANDARD = 'Standard',
  SLOW = 'Slow',
}

export const xpList = (l: Learning): number[] => {
  switch (l) {
    case Learning.FAST:
      return fastXP;
    case Learning.STANDARD:
      return standardXP;
    case Learning.SLOW:
      return slowXP;
    default:
      return standardXP;
  }
};
