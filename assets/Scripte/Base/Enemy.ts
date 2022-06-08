
import { _decorator, Component, Node, Collider2D, Contact2DType, Vec3, RigidBody2D, v2, v3, spriteAssembler, Sprite, math } from 'cc';
import { ENEMY_IN_VIEW_DIS } from '../Configs/Configs';
import { SpwanManager } from '../Enemys/SpwanManager';
import { ZuanshiManager } from '../Item/ZuanshiManager';
import { PlayerManager } from '../Player/PlayerManager';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { EFFECT_NAME_ENUM, ENTITY_TAG_ENUM, EVENT_TYPE } from './Enums';
const { ccclass, property } = _decorator;



@ccclass('Enemy')
export class Enemy extends Component {
    Player: PlayerManager = null;
    PlayerNode: Node = null;
    Speed: number = 3;
    Damage: number = 0;
    _enemyId: number = 0;
    Collider: Collider2D = null;
    // 与玩家接触的时间 =》 用来计算伤害间隔
    ContactTime: number = 0;
    Left: number;
    // 判断自己是否在玩家攻击范围内
    InViewTag: boolean = false;
    // 跟风暴接触的时候，需要变成蓝色并减速
    _isContactWithStorm: boolean = false;

    generateZuanshi() {
        const zuanshi = ZuanshiManager.Instance.getZuanshi();
        zuanshi.setPosition(this.node.getPosition())
    }

    init() {
        this.Player = Datamanager.Instance.Player;
        this.PlayerNode = Datamanager.Instance.Player.getPlayer();
        this.Collider = this.getComponent(Collider2D);
        this.Collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this)
        this.Collider.on(Contact2DType.END_CONTACT, this.endContact, this)
        // 计时器，每隔1分钟计算自身与玩家的距离，如果距离小于一定的值，
        // 那么就讲自身放入 玩家的攻击列表中。
        this.schedule(this.scheduleHandler, 1)
    }

    beginContact(self: Collider2D, other: Collider2D) {
        if (other.tag === ENTITY_TAG_ENUM.PLAYER) {
            this.ContactTime++;
            if (this.ContactTime === 20) {
                EventManger.Instance.emit(EVENT_TYPE.PLAYER_HURT, this.Damage)
                this.ContactTime = 0;
            }
        } else if (other.tag === ENTITY_TAG_ENUM.BULLET) {
            this.scheduleOnce(() => {
                // 敌人受到普通攻击伤害
                this.hurt(Datamanager.Instance.PWOER);
            }, 0.01)
        } else if (other.tag === ENTITY_TAG_ENUM.STORM) {
            // 设置与风暴接触的时候，变色
            if (this._isContactWithStorm === false) {
                // this.getComponent(Sprite).color = math.color(0, 141, 153, 255)
                this.Speed = 0
                if (this.Speed <= 0) {
                    this.Speed = 0;
                }
            }
            this.scheduleOnce(() => {
                this.hurt(5)
            }, 0.01)
        }
    }

    hurt(damage: number) {
        // 减少生命
        this.Left -= damage;
        // 如果生命小于等于1
        if (this.Left <= 0) {
            const index = Datamanager.Instance.EnemyInView.findIndex(i => i._enemyId === this._enemyId)
            // 从视野敌人中删除
            Datamanager.Instance.EnemyInView.splice(index, 1)
            // 删除当前敌人
            if (Datamanager.Instance.targetEnemy === this) {
                Datamanager.Instance.targetEnemy = null;
            }
            this.generateZuanshi();

            // 如果当前的敌人就是现在这个敌人，那么就将敌人回收至对象池中
            if (SpwanManager.Instance.currentEnemy === this.node.name) {
                this.node.active = false;
                this.Left = 200;
                // 将节点存入对象池中
                EventManger.Instance.emit(EVENT_TYPE.PUSH_ENEMY, this.node)
            } else {
                this.node.destroy();
            }
        }
    }
    // 获取与玩家的距离
    getDisFromPlayer() {
        const playerPos = this.Player.getPlayer().getPosition();
        const selfPos = this.getNodePos();
        const dis = Vec3.distance(playerPos, selfPos)
        return dis;
    }

    // 更新最近敌人
    updateTargetEnemy() {
        // 放置一个定时器，每过一段时间，是否与最近敌人的位置与玩家位置最近的那个
        let targetEnemy = Datamanager.Instance.targetEnemy;
        if (targetEnemy) {
            if (targetEnemy.getDisFromPlayer() >= this.getDisFromPlayer()) {
                Datamanager.Instance.targetEnemy = this;
            } else {
                targetEnemy = targetEnemy;
            }
        } else {
            Datamanager.Instance.targetEnemy = this;
        }
    }


    updateXY() {
        // 如果处于暂停状态，那么就暂停
        if (Datamanager.Instance.puasTag === false) {
            // 获得方向向量
            let pos = this.node.getPosition();
            let playerPos = this.PlayerNode.getPosition();
            // 归一化向量
            let dir = playerPos.subtract(pos)
            dir.normalize();
            if (dir.x > 0) {
                this.node.setScale(v3(1, 1, 1))
            } else if (dir.x < 0) {
                this.node.setScale(v3(-1, 1, 1))
            } else {
                this.node.setScale(this.node.getScale())
            }
            // 乘以速度
            this.getComponent(RigidBody2D).linearVelocity = v2(dir.x * this.Speed, dir.y * this.Speed)
        } else {
            this.getComponent(RigidBody2D).linearVelocity = v2(0, 0)
        }

    }

    /**
     * 如果自己与玩家的距离在一定的范围之内，
     * 就把自己添加的Datamanager中的enmeyinView数组中
     * 方便技能可以攻击到
     */
    pushSelfToView() {
        const playerPos = this.PlayerNode.getPosition();
        const slefPos = this.node.getPosition();
        const distanc = Vec3.distance(playerPos, slefPos);
        if (distanc < ENEMY_IN_VIEW_DIS) {
            this.InViewTag = true;
            Datamanager.Instance.pushEnemyInView(this)
        } else {
            // 删除自己
            Datamanager.Instance.removeEnemyInView(this._enemyId)
            this.InViewTag = false;
        }
    }

    scheduleHandler() {
        this.pushSelfToView();
        this.updateTargetEnemy();
    }

    update() {
        this.updateXY();
    }

    // 获取节点位置
    getNodePos() {
        return this.node.getPosition();
    }

    // 获取自身与玩家之间的距离
    endContact(slef: Collider2D, other: Collider2D) {
        switch (other.tag) {
            case ENTITY_TAG_ENUM.STORM:
                this._isContactWithStorm = false;
                this.Speed = 2;
                this.getComponent(Sprite).color = math.color(255, 255, 255, 255)
                break;
        }
    }
}
