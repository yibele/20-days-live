
import { _decorator, Component, Node } from 'cc';
import { Enemy } from '../Base/Enemy';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

/**
 * 刷怪控制器
 */
@ccclass('SpwanManager')
export class SpwanManager extends Component {

    private _enemys: Array<Enemy> = new Array();

    init() {
        // set Position
        // ser parant
    }

    getEnemy() {

    }

    handleSchlder() {

    }

}
