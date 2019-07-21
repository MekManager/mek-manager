import { LifeStage } from './lifeStage';

export class LifeModule {
    public stage: LifeStage;
    public name: string;

    constructor (stage: LifeStage, name: string) {
        this.name = name;
        this.stage = stage;
    }
}
