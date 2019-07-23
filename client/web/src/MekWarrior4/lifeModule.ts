import { LifeStage } from './lifeStage';
import { Rule, RuleName } from './rule';

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

  public hasRuleFor (name: RuleName): boolean {
    return this.ruleFor(name) !== undefined;
  }

  public ruleFor (name: RuleName): Rule {
    return this.rules.find(r => r.name === name);
  }

}
