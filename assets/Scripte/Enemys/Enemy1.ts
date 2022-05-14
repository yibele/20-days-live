
import { _decorator, Component, Node } from 'cc';
import { AbstracObject } from '../Base/AbstracObject';
import { Enemy } from '../Base/Enemy';
const { ccclass, property } = _decorator;

@ccclass('Enemy1')
export class Enemy1 extends Enemy {

    createEnemy() {
        super.createObejct('Enemy1');
    }

    init() {
        super.init();
    }
}


