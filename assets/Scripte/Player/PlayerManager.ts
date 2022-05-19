
import { _decorator, Component, Node, Vec2, RigidBody2D, Collider2D, UITransformComponent, v3, Contact2DType } from 'cc';
import { Enemy } from '../Base/Enemy';
import { ENTITY_TAG_ENUM, EVENT_TYPE, PARAMS_ENUM_TYPE, STATE_ENUM_TYPE } from '../Base/Enums';
import { Enemys, LIFE_BAR_WIDTH, PLAYER_CONFIG } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    private _lifeBar: Node = null;
    private _currentLife: number = 100;
    // 当前最大生命值
    private _totalLife: number = 100;

    move(velecity: Vec2) {
        if (velecity.x < 0) {
            this.node.getChildByName('body').setScale(v3(-1, 1, 1))
        } else if (velecity.x > 0) {
            this.node.getChildByName('body').setScale(v3(1, 1, 1))
        } else {
            // 人物在站立状态, 设置状态为站立
            this.node.setScale(this.node.getScale())
        }
        this.node.getComponent(RigidBody2D).linearVelocity = velecity;
    }

    init() {
        // 初始化玩家生命值
        this._lifeBar = this.node.getChildByName('lifeBar')
        this._currentLife = PLAYER_CONFIG.PLAYER_INIT_LIFE;
        this._totalLife = PLAYER_CONFIG.PLAYER_INIT_LIFE;
        EventManger.Instance.on(EVENT_TYPE.PLAYER_MOVE, this.move, this)
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

