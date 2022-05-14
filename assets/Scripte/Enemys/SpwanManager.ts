
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Enemy } from '../Base/Enemy';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

/**
 * 刷怪控制器
 */
@ccclass('SpwanManager')
export class SpwanManager extends Component {
    @property(Prefab)
    enmey1: Prefab = null;

    init() {

    }

    createEnemy() {
    }

    handleSchlder() {
    }

}
