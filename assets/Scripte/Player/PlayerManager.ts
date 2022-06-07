
import { _decorator, Component, Node, Vec2, RigidBody2D, UITransformComponent, v3, } from 'cc';
import { EVENT_TYPE, INCRESE_TYPE, STATE_ENUM_TYPE } from '../Base/Enums';
import { LIFE_BAR_WIDTH, PLAYER_CONFIG } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { PlayerStateMachine } from './PlayerStateMachine';
const { ccclass, property } = _decorator;

/**
 * 因为开发时技术不够成熟，所以导致该模块有如下问题；
 * 1、玩家的速度以及其他属性保存在dataManager中。
 * 2、玩家的移动逻辑，move以事件的形式保存在EventManager中。
 */

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    private _lifeBar: Node = null;
    private _currentLife: number = 100;
    // 当前最大生命值
    private _totalLife: number = 100;
    // 有限状态机
    private _fsm: PlayerStateMachine = null;

    /**
     * 
     * @param velecity 玩家的刚体速度
     */
    move(velecity: Vec2) {
        if (velecity.x === 0) {
            this.node.setScale(this.node.getScale())
            this._fsm.setParamsTure(STATE_ENUM_TYPE.IDLE)
        } else {
            this._fsm.setParamsTure(STATE_ENUM_TYPE.RUN)
            if (velecity.x > 0) {
                this.node.getChildByName('body').setScale(v3(1, 1, 1))
            } else {
                this.node.getChildByName('body').setScale(v3(-1, 1, 1))
            }
        }
        this.node.getComponent(RigidBody2D).linearVelocity = velecity;
    }

    init() {
        // 初始化玩家生命值
        this._lifeBar = this.node.getChildByName('lifeBar')
        this._currentLife = PLAYER_CONFIG.PLAYER_INIT_LIFE;
        this._totalLife = PLAYER_CONFIG.PLAYER_INIT_LIFE;
        // 有限状态机
        this._fsm = this.addComponent(PlayerStateMachine)
        this._fsm.init();
        // this.fire();
        this.registerEvents();
    }

    /**
     * 玩家升级
     */
    upgrade() {
        // 首先调用UI模块中的三个选项，让其显示。
        EventManger.Instance.emit(EVENT_TYPE.SHOW_UPGRADE_AWARD)
        // 设置玩家属性

    }

    /**
     * 按照百分比增加玩家速度
     * @param persent 增加速度的百分比
     */
    increaseSpeed(persent: number) {
        let speed = Datamanager.Instance._PlayerCurrentSpeed;
        speed = speed + speed * persent;
        Datamanager.Instance._PlayerCurrentSpeed = speed;
    }

    /**
     * 增加玩家生命值
     * @param dixLife 增加的生命力
     */
    increaseLife(dixLife: number, tag: INCRESE_TYPE) {
        if (tag === INCRESE_TYPE.PERSENT) {
            this._totalLife = this._totalLife * dixLife;
        } else {
            this._totalLife += dixLife;
        }
    }

    getPlayerPosition() {
        return this.node.getPosition();
    }

    getPlayer() {
        return this.node;
    }

    get currentLife() {
        return this._currentLife;
    }

    set currentLife(newLife: number) {
        this._currentLife = newLife
        if (this._currentLife <= 0) {
            this._currentLife = 0;
        }
        // render逻辑
        const width = LIFE_BAR_WIDTH / this._totalLife * this._currentLife;
        this._lifeBar.getComponent(UITransformComponent).setContentSize(width, 5)
    }

    hurt(damage: number) {
        this.currentLife -= damage;
        if (this.currentLife <= 0) {
            // 玩家死亡
        }
    }

    registerEvents() {
        EventManger.Instance.on(EVENT_TYPE.PLAYER_MOVE, this.move, this)
        EventManger.Instance.on(EVENT_TYPE.PLAYER_HURT, this.hurt, this)
        EventManger.Instance.on(EVENT_TYPE.PLAYER_UPGRADE, this.upgrade, this)
        EventManger.Instance.on(EVENT_TYPE.PLAYER_INCREASE_SPEED, this.increaseSpeed, this)
        EventManger.Instance.on(EVENT_TYPE.PLAYER_INCREASE_LIFE, this.increaseLife, this)
    }

    onDestroy() {
        EventManger.Instance.off(EVENT_TYPE.PLAYER_MOVE, this.move)
        EventManger.Instance.off(EVENT_TYPE.PLAYER_HURT, this.hurt)
        EventManger.Instance.off(EVENT_TYPE.PLAYER_UPGRADE, this.upgrade)
        EventManger.Instance.off(EVENT_TYPE.PLAYER_INCREASE_SPEED, this.increaseSpeed)
        EventManger.Instance.off(EVENT_TYPE.PLAYER_INCREASE_LIFE, this.increaseLife)
    }


}

