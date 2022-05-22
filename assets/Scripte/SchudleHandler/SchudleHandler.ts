import { _decorator, Component, Node } from 'cc';
import { Effect } from '../Base/Effect';
const { ccclass, property } = _decorator;

/**
 * 定时器控制器
 * 1、控制产生的敌人
 * 2、控制产生的特效、子弹
 */
@ccclass('SchudleHandler')
export class SchudleHandler extends Component {

    private _effectList: Array<Effect> = new Array();

    handleEffects(effect: Effect) {

    }
}

