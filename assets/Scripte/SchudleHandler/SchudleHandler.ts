import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Effect } from '../Base/Effect';
import { EFFECT_NAME_ENUM } from '../Base/Enums';
import { Singleton } from '../Base/Singleton';
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

    // 风暴的pool
    private stormPool: Array<Node> = new Array();
    // 风暴数量
    private _stormNum: number = 1;
    // 风暴刷新时间
    private _stormInterval: number = STORM_CONFIG.STORM_INTERVAL;
    // 风暴持续时间
    private _stormExitTime: number = STORM_CONFIG.STORM_EXIT_TIME;
    // 风暴的预制体
    private _stormPrefab: Prefab = null;


    static get Instance() {
        return super.getInstance<SchudleHandler>();
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

        // 刷新激活的特效
        this.handleEffect();
    }

    handleEffect() {
        this.handleStorm();
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

