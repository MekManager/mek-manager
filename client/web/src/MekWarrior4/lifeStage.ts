export enum LifeStage {
  AFFILIATION = 0,
  EARLY_CHILDHOOD = 1,
  LATE_CHILDHOOD = 2,
  HIGHER_EDUCATION = 3,
  REAL_LIFE = 4,
}

export const lifeStageName = (ls: LifeStage): string => {
  switch (ls) {
    case LifeStage.AFFILIATION:
      return 'Affiliation';
    case LifeStage.EARLY_CHILDHOOD:
      return 'Early Childhood';
    case LifeStage.LATE_CHILDHOOD:
      return 'Late Childhood';
    case LifeStage.HIGHER_EDUCATION:
      return 'Higher Education';
    case LifeStage.REAL_LIFE:
      return 'Real Life';
  }
};
