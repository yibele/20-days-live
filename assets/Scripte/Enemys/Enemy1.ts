
import { _decorator, Component, Node, RigidBody2D, v2, v3, Vec2, Vec3 } from 'cc';
import { AbstracObject } from '../Base/AbstracObject';
import { Enemy } from '../Base/Enemy';
import { ENEMY_IN_VIEW_DIS, ENMEY_INIT_SPPED } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

@ccclass('Enemy1')
export class Enemy1 extends Enemy {
    private _plyaer: Node;
    private _speed: number = 2;


    start() {
        this.init();
    }

    init() {
        this._plyaer = Datamanager.Instance.Player.getPlayer();
        this._speed = ENMEY_INIT_SPPED;
    }

    updateXY() {
        // 获得方向向量
        let pos = this.node.getPosition();
        let playerPos = this._plyaer.getPosition();
        // 归一化向量
        let dir = playerPos.subtract(pos)
        dir.normalize();
        if (dir.x > 0) {
            this.node.setScale(v3(1, 1, 1))
        } else if (dir.x < 0) {
            this.node.setScale(v3(-1, 1, 1))
        } else {
            this.node.setScale(this.node.getScale())
        }
        // 乘以速度
        this.getComponent(RigidBody2D).linearVelocity = v2(dir.x * this._speed, dir.y * this._speed)

        this.pushSelfToView();
    }

    /**
     * 如果自己与玩家的距离在一定的范围之内，
     * 就把自己添加的Datamanager中的enmeyinView数组中
     * 方便技能可以攻击到
     */
    pushSelfToView() {
        const playerPos = this._plyaer.getPosition();
        const slefPos = this.node.getPosition();
        const distanc = Vec3.distance(playerPos, slefPos);
        if (distanc < ENEMY_IN_VIEW_DIS) {
            Datamanager.Instance.pushEnemyInView(this)
        } else {
            // 删除自己
            Datamanager.Instance.removeEnemyInView(this._enemyId)
        }
    }

    update() {
        this.updateXY();
    }


}


