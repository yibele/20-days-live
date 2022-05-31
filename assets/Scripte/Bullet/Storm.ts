import { _decorator, Component, Node } from 'cc';
import { Enemy } from '../Base/Enemy';
import { STORM_CONFIG } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { SchudleHandler } from '../SchudleHandler/SchudleHandler';
const { ccclass, property } = _decorator;
/**
 * 5.31 开发思路记录
 * 风暴部分的开发思路
 * 1、风暴跟子弹需要分开吗？ 需要分开，风暴属于生成类型的，不需要知道玩家的位置，只需要在特定的位置刷新就可以了
 * 2、风暴的伤害怎么计算？ 风暴的伤害应该在敌人的身上去计算。因为风暴有可能同时接触多个敌人，如果在风暴上进行计算的话
 * 那么需要进行遍历，有点麻烦。
 * 3、那么在敌人身上怎么计算风暴的伤害？首先，需要有两个tag，来标记是风暴还是子弹。如果是风暴的话，按照持续时间减少生命，如果是子弹的话，
 * 那么按照次数减少生命。
 * 4、风暴要采用对象池的方法生成
 */

@ccclass('Storm')
export class Storm extends Component {

    // 伤害
    private _damage: number = STORM_CONFIG.STORM_DAMAGE;
    // spped
    private _speed: number = STORM_CONFIG.STORM_SPEED;
    // active tag
    private _activeTag: boolean = false;
    // 攻击范围内的敌人
    private _enemyInView: Array<Enemy> = null;

    init() {
        // 获取视野内的敌人，如果没有敌人，那就返回
        this._enemyInView = Datamanager.Instance.EnemyInView;
        if (this._enemyInView.length <= 0) {
            return;
        }

        // 设置风暴的位置
        this.setPosition();
        // 持续时间之后，关闭storm；
        this.scheduleOnce(() => {
            this._activeTag = false;
            this.node.active = false;
            SchudleHandler.Instance.pushStorm(this.node)
        }, SchudleHandler.Instance.stormExitTime)
    }

    /**
     * 设置风暴的初始位置。
     * 想法：1、首先从攻击范围内的敌人中随机选取一个敌人，生成。
     * 2、如果攻击范围内没有敌人，那么就不生成
     */
    setPosition() {
        // 获取视野内的敌人
        const random = Math.floor(Math.random() * this._enemyInView.length);
        const targetEnemy = this._enemyInView[random];
        this.node.active = true;
        this.node.setParent(Datamanager.Instance.RootNode)
        this.node.setPosition(targetEnemy.getNodePos());
        this._activeTag = true;

    }

    updateXY() {
        let targetX = (Math.random() * 2 - 1) * this._speed;
        let targetY = (Math.random() * 2 - 1) * this._speed;
        let pos = this.node.getPosition()

        this.node.setPosition(pos.x + targetX, pos.y + targetY, 0)
    }

    update() {
        if (this._activeTag) {
            this.updateXY();
        }
    }


}

