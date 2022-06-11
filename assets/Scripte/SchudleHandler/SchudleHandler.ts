import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Effect } from '../Base/Effect';
import { EFFECT_NAME_ENUM, EVENT_TYPE } from '../Base/Enums';
import { Singleton } from '../Base/Singleton';
import { Bullet } from '../Bullet/Bullet';
import { Spell } from '../Bullet/Spell';
import { Storm } from '../Bullet/Storm';
import { SPELL_CONFIG, STORM_CONFIG } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
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
    private _stormNum: number = 1;
    // 风暴刷新时间
    private _stormInterval: number = STORM_CONFIG.STORM_INTERVAL;
    // 风暴持续时间
    private _stormExitTime: number = STORM_CONFIG.STORM_EXIT_TIME;
    // 风暴的预制体
    private _stormPrefab: Prefab = null;

    // Spell特效
    private _spellInterval: number = SPELL_CONFIG.SPELL_INTERVAL;
    private _spellExitTime: number = SPELL_CONFIG.SPELL_EXIT_TIME;
    _spell: Node = null;
    private _spellRang: number = SPELL_CONFIG.SPELL_RANG;

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

    enalbeEffect(effectName: EFFECT_NAME_ENUM) {
        this.setActiveEffect(effectName)
    }

    cancleSchulder() {
        this.unscheduleAllCallbacks();
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

    set spellRange(newRang: number) {
        this._spellRang = newRang;
    }

    get spellRange() {
        return this._spellRang;
    }

    get stormExitTime() {
        return this._stormExitTime;
    }

    set stormExitTime(newTime: number) {
        this.stormExitTime = newTime;
    }

    get spellExitTime() {
        return this._spellExitTime;
    }

    set spellExitTime(newTIme: number) {
        this._spellExitTime = newTIme;
    }

    init() {
        this.test();
        this.handleSchulder();
        // 注册特效
        EventManger.Instance.on(EVENT_TYPE.ENABLE_EFFECT, this.enalbeEffect, this)
        EventManger.Instance.on(EVENT_TYPE.PLAYER_INCREASE_FIRE_INTERVAL, this.increaseFireInterval, this)


    }


    onDestroy() {
        EventManger.Instance.off(EVENT_TYPE.ENABLE_EFFECT, this.enalbeEffect)
        EventManger.Instance.off(EVENT_TYPE.PLAYER_INCREASE_FIRE_INTERVAL, this.increaseFireInterval)
    }

    /** 攻击速度增加 */
    increaseFireInterval(persent: number) {
        this._bulletInterval *= (1 - persent)
    }

    handleSchulder() {
        // 如果游戏暂停，那么返回
        // 刷新子弹
        this.handleBullet();
        // 刷新激活的特效
        this.handleEffect();
    }

    handleEffect() {
        this.handleStorm();
        this.handleSpell();
    }

    handleBullet() {
        var that = this;
        this.schedule(that.bulletSchudle, that._bulletInterval)
    }

    bulletSchudle() {
        const bullet = this.getBullet();
        const manager = bullet.getComponent(Bullet)
        manager.init();
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
            this.schedule(this.stormSchulde, that._stormInterval)
        }
    }

    handleSpell() {
        if (this.activeEffects.get(EFFECT_NAME_ENUM.SPELL)) {
            var that = this;
            this.schedule(this.SpellSchudle, this._spellInterval)
        }
    }


    SpellSchudle() {
        var that = this;
        const spellPrefab = Datamanager.Instance.Prefabs.find(i => i.data.name === EFFECT_NAME_ENUM.SPELL)
        if (this._spell === null) {
            this._spell = instantiate(spellPrefab)
            this._spell.setParent(Datamanager.Instance.RootNode)
        }
        this._spell.addComponent(Spell).init(this._spellExitTime);
    }

    stormSchulde() {
        if (Datamanager.Instance.EnemyInView.length <= 0) {
            return;
        }
        var that = this;
        for (let i = 0; i < that._stormNum; i++) {
            let storm = that.getStorm();
            storm.getComponent(Storm).init()
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

    /** test */
    test() {
        this.activeEffects.set(EFFECT_NAME_ENUM.SPELL, true)
        this.activeEffects.set(EFFECT_NAME_ENUM.STORM, true)
    }

}

