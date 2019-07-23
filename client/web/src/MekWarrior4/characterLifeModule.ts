import { LifeModule } from './lifeModule';
import { LifeStage } from './lifeStage';

/**
 * A wrapper class that describes how a character is using a given `LifeModule`
 */
export class CharacterLifeModule {
  public module: LifeModule;
  public stage: LifeStage;

  constructor (stage: LifeStage, module: LifeModule) {
    this.stage = stage;
    this.module = module;
  }
}