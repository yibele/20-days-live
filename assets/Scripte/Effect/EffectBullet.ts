import { _decorator, Component, Node, instantiate } from 'cc';
import { Effect } from '../Base/Effect';
import { EFFECT_NAME_ENUM } from '../Base/Enums';
const { ccclass, property } = _decorator;

/**
 * 这个类是直接将脚本挂在到特效上面的，
 * 不再动态挂载脚本了
 */
@ccclass('EffectBullet')
export class EffectBullet extends Component {

    start() {

    }

}

