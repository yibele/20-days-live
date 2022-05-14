
import { _decorator, Component, Node, RigidBody2D, v2 } from 'cc';
import { AbstracObject } from '../Base/AbstracObject';
import { Enemy } from '../Base/Enemy';
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
    }

    updateXY() {
        // 获得方向向量
        let pos = this.node.getPosition();
        let playerPos = this._plyaer.getPosition();
        // 归一化向量
        let dir = playerPos.subtract(pos)
        dir.normalize();
        // 乘以速度
        this.getComponent(RigidBody2D).linearVelocity = v2(dir.x * this._speed, dir.y * this._speed)
    }

    update() {
        this.updateXY();
    }


}


