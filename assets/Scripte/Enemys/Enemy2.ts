import { _decorator, Component, Node } from 'cc';
import { Enemy } from '../Base/Enemy';
const { ccclass, property } = _decorator;

@ccclass('Enemy2')
export class Enemy2 extends Enemy {
    start() {
        this.init();
    }
    init() {
        super.init();
        this.Speed = 2;
        this.Damage = 15;
        this.Left = 100;
    }
}

