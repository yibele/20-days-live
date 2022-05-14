
import { _decorator, Component, Node, Vec2, RigidBody2D, Collider2D } from 'cc';
import { EVENT_TYPE } from '../Base/Enums';
import { EventManger } from '../Runtime/EventManger';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    move(velecity: Vec2) {
        this.getComponent(RigidBody2D).linearVelocity = velecity;
    }

    init() {
        EventManger.Instance.on(EVENT_TYPE.PLAYER_MOVE, this.move, this)
        let Collider = this.getComponent(Collider2D)

    }
}

