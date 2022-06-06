import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { EFFECT_NAME_ENUM } from '../Base/Enums';
import { Singleton } from '../Base/Singleton';
import { Bullet } from '../Bullet/Bullet';
import { Storm } from '../Bullet/Storm';
import { STORM_CONFIG } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

/**
 * 定时器控制器
 * 1、控制产生的敌人
 * 2、控制产生的特效、子弹
 * 3、保存特效相关设置
 */
@ccclass('SchudleHandler')
export class SchudleHandler extends Singleton {

    // 已经激活了的特效
    activeEffects: Map<EFFECT_NAME_ENUM, boolean> = new Map();

    /** 风暴特效 */
    // 风暴的pool
    private stormPool: Array<Node> = new Array();
    // 风暴数量
    private _stormNum: number = 4;
    // 风暴刷新时间
    private _stormInterval: number = STORM_CONFIG.STORM_INTERVAL;
    // 风暴持续时间
    private _stormExitTime: number = STORM_CONFIG.STORM_EXIT_TIME;
    // 风暴的预制体
    private _stormPrefab: Prefab = null;

    /** 子弹特效 */
    // 子弹预制体
    private _bulletPrefab: Prefab = null;
    // 子弹发射间隔
    private _bulletInterval: number = 1;
    // 子弹的对象池
    private _bulletPool: Array<Node> = new Array();


    static get Instance() {
        return super.getInstance<SchudleHandler>();
    }

    setActiveEffect(effectName: EFFECT_NAME_ENUM) {
        this.activeEffects.set(effectName, true)
    }

    getActiveEffect() {
        return this.activeEffects;
    }

    delActiveEffect(effectName: EFFECT_NAME_ENUM) {
        this.activeEffects.delete(effectName)
    }

    get stormExitTime() {
        return this._stormExitTime;
    }

    set stormExitTime(newTime: number) {
        this.stormExitTime = newTime;
    }

    init() {
        this.test();
        this.handleSchulder();
    }

    handleSchulder() {
        // 刷新子弹
        this.handleBullet();
        // 刷新激活的特效
        this.handleEffect();
    }

    handleEffect() {
        this.handleStorm();
    }

    handleBullet() {
        var that = this;
        this.schedule(() => {
            const bullet = that.getBullet();
            const manager = bullet.getComponent(Bullet)
            manager.init();
        }, that._bulletInterval)
    }

    getBullet() {
        if (this._bulletPool.length > 0) {
            return this._bulletPool.pop();
        } else {
            if (this._bulletPrefab === null) {
                this._bulletPrefab = Datamanager.Instance.Prefabs.find(i => i.data.name === EFFECT_NAME_ENUM.EFFECT_BULLET)
            }
            const bullet = instantiate(this._bulletPrefab)
            bullet.addComponent(Bullet)
            return bullet;
        }
    }

    pushBullet(bullet: Node) {
        this._bulletPool.push(bullet)
    }

    /**
     * 风暴特效刷新
     */
    handleStorm() {
        // 如果特效已经激活了的话
        if (this.activeEffects.get(EFFECT_NAME_ENUM.STORM)) {
            var that = this;
            this.schedule(function () {
                for (let i = 0; i < that._stormNum; i++) {
                    let storm = that.getStorm();
                    storm.getComponent(Storm).init()
                }
            }, that._stormInterval)
        }
    }

    cancleShudle(func: Function) {
        this.unschedule(func)
    }

    // 从对象池获取Storm
    getStorm() {
        if (this.stormPool.length > 0) {
            const storm = this.stormPool.pop();
            return storm;
        } else {
            if (this._stormPrefab === null) {
                this._stormPrefab = Datamanager.Instance.Prefabs.find(i => i.data.name === EFFECT_NAME_ENUM.STORM)
            }
            const storm = instantiate(this._stormPrefab)
            storm.addComponent(Storm);
            return storm;
        }
    }

    // 将Storm放回对象池
    pushStorm(storm: Node) {
        this.stormPool.push(storm)
    }


    test() {
        this.activeEffects.set(EFFECT_NAME_ENUM.STORM, true)
    }


}

