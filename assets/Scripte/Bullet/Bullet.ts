import { _decorator, Component, Node, Vec2, instantiate, Vec3, RigidBody, RigidBody2D, v2, Collider2D, Contact2DType, Animation } from 'cc';
import { Enemy } from '../Base/Enemy';
import { ENTITY_TAG_ENUM } from '../Base/Enums';
import { PlayerManager } from '../Player/PlayerManager';
import { Datamanager } from '../Runtime/Datamanager';
import { SchudleHandler } from '../SchudleHandler/SchudleHandler';
const { ccclass, property } = _decorator;

@ccclass('Bulet')
export class Bullet extends Component {

    Player: PlayerManager = null;
    Dir: Vec3 = new Vec3();
    targetEnemy: Enemy = null;
    speed: number = 15;
    Collider: Collider2D = null;

    init() {
        // 获取当前玩家
        this.Player = Datamanager.Instance.Player;
        // 获取敌人列表中的第一个敌人
        this.targetEnemy = Datamanager.Instance.targetEnemy;

        this.Collider = this.getComponent(Collider2D)
        this.Collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this)

        if (this.targetEnemy) {
            const playerPos = this.Player.getPlayer().getPosition();
            const targetEnemyPos = this.targetEnemy.getNodePos();
            this.Dir = targetEnemyPos.subtract(playerPos).normalize();
            this.getComponent(RigidBody2D).linearVelocity = v2(this.Dir.x * this.speed, this.Dir.y * this.speed)

            this.node.setParent(Datamanager.Instance.RootNode)
            this.node.setPosition(playerPos)
            this.getComponent(Collider2D).tag = ENTITY_TAG_ENUM.BULLET;
        }
    }

    destroyNode() {
        this.node.active = false;
        SchudleHandler.Instance.pushBullet(this.node)
    }

    beginContact(self: Collider2D, other: Collider2D) {
        if (other.tag === ENTITY_TAG_ENUM.ENMEY) {
            this.getComponent(RigidBody2D).linearVelocity = v2(0, 0)
            // 如果动画正在播放，那么就返回
            this.getComponent(Animation).once(Animation.EventType.FINISHED, this.destroyNode, this)
            if (this.getComponent(Animation).getState('1').isPlaying) {
                return
            }
            this.getComponent(Animation).play('1')

        }
    }



}

