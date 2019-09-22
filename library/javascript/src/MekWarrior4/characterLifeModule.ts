import { LifeModule } from './lifeModule';
import { LifeStage } from './lifeStage';
import { Rule } from './rule';
import { RuleName } from './ruleName';

/**
 * A wrapper class that describes how a character is using a given `LifeModule`
 */
export class CharacterLifeModule {
  /**
   * The stage this character took the module at.
   * Be aware that there are valid reasons for this value to differ from the
   * stage the module says it should be taken for.
   */
  public stage: LifeStage;
  // TODO: This should get a proper type in the future.
  public fields?: string[];

  /** The module this class encapsulates */
  private _module: LifeModule;

  constructor (stage: LifeStage, module: LifeModule) {
    this.stage = stage;
    this._module = module;
    this.fields = [];
  }

  /**
   * Returns the stage of the module this encapsulates. This is the stage the
   * module is intended to be taken at.
   */
  get baseStage (): LifeStage {
    return this._module.stage;
  }

  /**
   * Returns if the encapsulated module is enforcing the provided rule.
   *
   * @param name The name of the rule to check for enforcement of
   */
  public hasRuleFor (name: RuleName): boolean {
    return this._module.hasRuleFor(name);
  }

  /**
   * Returns if the module this encapsulates is Clan.
   */
  get isClan (): boolean {
    return this._module.isClan;
  }

  /**
   * Returns the name of the module this encapsulates.
   */
  get name (): string {
    return this._module.name;
  }

  /**
   * Returns all rules that are enforced by the encapsulated module.
   */
  get rules (): Rule[] {
    return this._module.rules;
  }
}
