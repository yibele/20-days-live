
import { _decorator, Component, Node, Vec2, RigidBody2D, Collider2D, UITransformComponent, v3, Contact2DType, instantiate, View, Vec3, v2 } from 'cc';
import { Enemy } from '../Base/Enemy';
import { EFFECT_NAME_ENUM, ENTITY_TAG_ENUM, EVENT_TYPE, PARAMS_ENUM_TYPE, STATE_ENUM_TYPE } from '../Base/Enums';
import { Bullet } from '../Bullet/Bullet';
import { BULLET_SPEED, Enemys, LIFE_BAR_WIDTH, PLAYER_CONFIG } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { PlayerStateMachine } from './PlayerStateMachine';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    private _lifeBar: Node = null;
    private _currentLife: number = 100;
    // 当前最大生命值
    private _totalLife: number = 100;
    // 有限状态机
    private _fsm: PlayerStateMachine = null;

    /**
     * 玩家开火
     */
    fire() {
        // 要有一个定时器
        // 要生成一个子弹
        // 子弹向着最近的敌人发射
        this.schedule(function () {
            const prefab = Datamanager.Instance.Prefabs.find(i => i.data.name === EFFECT_NAME_ENUM.EFFECT_BULLET)
            const bullet = instantiate(prefab)
            bullet.getComponent(Bullet).init();
        }, Datamanager.Instance.PlayerFireInternal)
    }

    getBulletDir(enemyPos: Vec3) {
        const dir = this.node.getPosition().subtract(enemyPos)
        return v2(dir.normalize().x, dir.normalize().y)
    }

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
        this.fire();
        EventManger.Instance.on(EVENT_TYPE.PLAYER_MOVE, this.move, this)
        EventManger.Instance.on(EVENT_TYPE.PLAYER_HURT, this.hurt, this)
        // EventManger.Instance.on(EVENT_TYPE.PLAYER_FIRE, this.fire, this)
    }

    onDestroy() {
        EventManger.Instance.off(EVENT_TYPE.PLAYER_MOVE, this.move)
        EventManger.Instance.off(EVENT_TYPE.PLAYER_HURT, this.hurt)
        // EventManger.Instance.off(EVENT_TYPE.PLAYER_FIRE, this.fire)
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
        const width = LIFE_BAR_WIDTH / this._totalLife * this._currentLife;
        this._lifeBar.getComponent(UITransformComponent).setContentSize(width, 5)
    }

    hurt(damage: number) {
        this.currentLife -= damage;
    }
}

