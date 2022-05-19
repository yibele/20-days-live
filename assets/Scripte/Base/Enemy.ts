
import { _decorator, Component, Node } from 'cc';
import { AbstracObject } from './AbstracObject';
const { ccclass, property } = _decorator;


@ccclass('Enemy')
export class Enemy extends AbstracObject {
    _enemyId: number = 0;
    init() {

    }
}
