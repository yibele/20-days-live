
import { _decorator, Component, Node, Collider2D, Contact2DType } from 'cc';
import { PlayerManager } from '../Player/PlayerManager';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { ENTITY_TAG_ENUM, EVENT_TYPE } from './Enums';
const { ccclass, property } = _decorator;



@ccclass('Enemy')
export class Enemy extends Component {
    Player: PlayerManager = null;
    PlayerNode: Node = null;
    Speed: number = 2;
    Damage: number = 0;
    _enemyId: number = 0;
    Collider: Collider2D = null;
    ContactTime: number = 0;
    Left: number = 100;

    init() {
        this.Player = Datamanager.Instance.Player;
        this.Collider = this.getComponent(Collider2D);
        this.Collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this)
        this.Collider.on(Contact2DType.END_CONTACT, this.endContact, this)
    }

    beginContact(self: Collider2D, other: Collider2D) {
        if (other.tag === ENTITY_TAG_ENUM.PLAYER) {
            // this.Player.hurt(this.Damage)
            this.ContactTime++;
            if (this.ContactTime === 50) {
                EventManger.Instance.emit(EVENT_TYPE.PLAYER_HURT, this.Damage)
                this.ContactTime = 0;
            }
        } else if (other.tag === ENTITY_TAG_ENUM.BULLET) {
            this.scheduleOnce(() => {
                // 敌人受到伤害
                this.hurt();
            }, 0.01)
        }
    }

    hurt() {
        this.Left -= 50;
        if (this.Left <= 0) {
            const index = Datamanager.Instance.EnemyInView.findIndex(i => i._enemyId === this._enemyId)
            Datamanager.Instance.EnemyInView.splice(index, 1)
            this.node.destroy();
        }
    }


    getNodePos() {
        return this.node.getPosition();
    }

    endContact() {

    }
}
