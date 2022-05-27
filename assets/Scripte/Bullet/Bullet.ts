import { _decorator, Component, Node, Vec2, instantiate, Vec3, RigidBody, RigidBody2D, v2, Collider2D, Contact2DType } from 'cc';
import { Enemy } from '../Base/Enemy';
import { ENTITY_TAG_ENUM } from '../Base/Enums';
import { PlayerManager } from '../Player/PlayerManager';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

@ccclass('Bulet')
export class Bullet extends Component {

    Player: PlayerManager = null;
    Dir: Vec3 = new Vec3();
    targetEnemy: Enemy = null;
    speed: number = 5;
    Collider: Collider2D = null;

    init() {
        this.Player = Datamanager.Instance.Player;
        this.targetEnemy = Datamanager.Instance.EnemyInView[0];
        this.Collider = this.getComponent(Collider2D)
        this.Collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this)

        if (this.targetEnemy !== undefined && this.targetEnemy !== null) {
            const playerPos = this.Player.getPlayer().getPosition();
            const targetEnemyPos = this.targetEnemy.getNodePos();
            this.Dir = targetEnemyPos.subtract(playerPos).normalize();
            this.getComponent(RigidBody2D).linearVelocity = v2(this.Dir.x * this.speed, this.Dir.y * this.speed)

            this.node.setParent(Datamanager.Instance.RootNode)
            this.node.setPosition(playerPos)
            this.getComponent(Collider2D).tag = ENTITY_TAG_ENUM.BULLET;
        }

    }

    beginContact(self: Collider2D, other: Collider2D) {
        if (other.tag === ENTITY_TAG_ENUM.ENMEY) {
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.001)
        }
    }



}

