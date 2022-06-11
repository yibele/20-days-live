import { _decorator, Component, Vec2 } from 'cc';
import { Datamanager } from '../Runtime/Datamanager';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('Effect')
export abstract class Effect extends Component {

    public damage: number;
    public speed: number;
    public enemyInView: Array<Enemy> = null;

    abstract init(params?: any): void;
    abstract setPosition(pos?: Vec2): void;

}

