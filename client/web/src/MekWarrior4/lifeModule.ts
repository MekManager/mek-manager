import { LifeStage } from './lifeStage';
import { Rule } from './rules';

export class LifeModule {
  public isClan: boolean;
  public name: string;
  public rules: Rule[];
  public stage: LifeStage;

  private _memo: {
    legalChildLabor?: boolean,
  };

  constructor (
    stage: LifeStage,
    name: string,
    rules: Rule[],
    isClan = false
  ) {
    this.stage = stage;
    this.name = name;
    this.rules = rules;
    this.isClan = isClan;

    this._memo = {};
  }

  public legalChildLabor (): boolean {
    if (this._memo.legalChildLabor) {
      return this._memo.legalChildLabor;
    } else {
      this._memo.legalChildLabor = this.rules.includes(Rule.LEGAL_CHILD_LABOR);

      return this._memo.legalChildLabor;
    }
  }
}
