import { LifeModule } from './lifeModule';
import { LifeStage } from './lifeStage';
import { SpecialRules } from './specialRules';

export class Affiliation extends LifeModule {
  private readonly _specialRules: SpecialRules;

  constructor (opts: { specialRules?: SpecialRules, name: string }) {
    super(LifeStage.AFFILIATION, opts.name);
    this._specialRules = opts.specialRules ? opts.specialRules : {};
  }

  public legalChildLabor (): boolean {
    return !!this._specialRules.childLabor;
  }
}
