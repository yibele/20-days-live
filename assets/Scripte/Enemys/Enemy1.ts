
import { _decorator, Component, Node } from 'cc';
import { AbstracObject } from '../Base/AbstracObject';
const { ccclass, property } = _decorator;

@ccclass('Enemy1')
export class Enemy1 extends AbstracObject {

    createEnemy() {
        super.createObejct('Enemy1');
    }

    init() {

    }
}


