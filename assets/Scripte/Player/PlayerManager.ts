
import { _decorator, Component, Node, Vec2, RigidBody2D, Collider2D, UITransformComponent, v3, Contact2DType } from 'cc';
import { EVENT_TYPE, PARAMS_ENUM_TYPE, STATE_ENUM_TYPE } from '../Base/Enums';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {


    move(velecity: Vec2) {
        if (velecity.x < 0) {
            this.node.setScale(v3(-1, 1, 1))
        } else if (velecity.x > 0) {
            this.node.setScale(v3(1, 1, 1))
        } else {
            // 人物在站立状态, 设置状态为站立
            this.node.setScale(this.node.getScale())
        }
        this.getComponent(RigidBody2D).linearVelocity = velecity;
    }

    init() {
        EventManger.Instance.on(EVENT_TYPE.PLAYER_MOVE, this.move, this)
        let collider = this.node.getComponent(Collider2D)
        console.log(collider);
        collider.on(Contact2DType.BEGIN_CONTACT, function () {
        })
    }
    getPlayer() {
        return this.node;
    }

}

