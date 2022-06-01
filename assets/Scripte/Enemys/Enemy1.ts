
import { _decorator, Component, Node, RigidBody2D, v2, v3, Vec2, Vec3 } from 'cc';
import { AbstracObject } from '../Base/AbstracObject';
import { Enemy } from '../Base/Enemy';
import { ENEMY_IN_VIEW_DIS, ENMEY_INIT_SPPED } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

@ccclass('Enemy1')
export class Enemy1 extends Enemy {

    start() {
        this.init();
    }

    init() {
        super.init();
        console.log('enemy1 init')
        this.Speed = ENMEY_INIT_SPPED;
        this.Damage = 10;
        this.Left = 200;
    }
}


