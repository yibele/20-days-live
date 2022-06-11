
import { _decorator, Component, Node, instantiate, view, Vec3 } from 'cc';
import { Enemy } from '../Base/Enemy';
import { EVENT_TYPE } from '../Base/Enums';
import { Singleton } from '../Base/Singleton';
import { ENMEY_PER_WAVE, ENMEY_SPWAN_TIME } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
const { ccclass, property } = _decorator;

/**
 * 刷怪控制器
 * 6.1 设计思路
 * 
 * @todo 6.7 刷怪的思路需要更改一下，
 * 当怪物死亡的时候，直接改变怪物的位置到屏幕外面，
 * 在执行移动逻辑就可以了，以减少系统开销
 */
@ccclass('SpwanManager')
export class SpwanManager extends Singleton {
    // 敌人的对象池
    private _enemyPools: Array<Node> = new Array();
    // 当前应当刷新的敌人
    private _currentEnemy: string = 'Enemy2'
    private enemy: Node = null;
    private id = 0;

    static get Instance() {
        return super.getInstance<SpwanManager>();
    }

    get currentEnemy() {
        return this._currentEnemy;
    }

    cancleSchulder() {
        this.unscheduleAllCallbacks();
    }

    set currentEnemy(enemyName: string) {
        this._currentEnemy = enemyName;
        // 更换了当前应当刷新的敌人后，就要清空对象池。
        if (this._enemyPools.length > 0) {
            // 销毁对象
            this._enemyPools.forEach(i => i.destroy())
            // 初始化对象池
            this._enemyPools = []
        }
    }

    init() {
        // 保存节点
        Datamanager.Instance.SpwanManager = this;
        // 注册事件
        EventManger.Instance.on(EVENT_TYPE.SPWAN_ENEMY, this.createEnemy, this)
        // 从对象池获取敌人
        EventManger.Instance.on(EVENT_TYPE.GET_ENEMY, this.getEnemy, this)
        // 将敌人放入对象池
        EventManger.Instance.on(EVENT_TYPE.PUSH_ENEMY, this.pushEnemy, this)
        this.beginSwpan();
    }

    beginSwpan() {
        this.handleSchlder();
        this.spwanEnemy();
    }

    getEnemy() {
        if (this._enemyPools.length > 0) {
            return this._enemyPools.pop();
        } else {
            const enemy = Datamanager.Instance.Prefabs.find(i => i.data.name === this.currentEnemy)
            return instantiate(enemy)
        }
    }

    pushEnemy(enemy: Node) {
        this._enemyPools.push(enemy)
    }

    createEnemy() {
        let pos = new Vec3();
        const plyaerPos = Datamanager.Instance.Player.getPlayer().getPosition()
        for (let i = 0; i < ENMEY_PER_WAVE; i++) {

            let t = Math.random() + 0.5;
            let z = Math.random() + 0.5;
            let x = Math.random() + 0.5;
            let p = Math.random();
            // 随机生成-1 或者 1
            let f = 1;
            let ff = 1;
            if (x < 0.75) {
                f = 1;
            } else {
                f = -1;
            }

            if (p < 0.5) {
                ff = 1;
            } else {
                ff = -1;
            }
            pos.x = plyaerPos.x + view.getVisibleSize().width * f * t;
            pos.y = plyaerPos.y + view.getVisibleSize().height * ff * z;
            const enemy = this.getEnemy();
            enemy.getComponent(Enemy)._enemyId = this.id;
            this.id++;
            enemy.setPosition(pos)
            enemy.setParent(this.node);

        }
    }

    spwanEnemy() {
        EventManger.Instance.emit(EVENT_TYPE.SPWAN_ENEMY)
    }

    handleSchlder() {
        this.schedule(this.spwanEnemy, ENMEY_SPWAN_TIME)
    }

}
