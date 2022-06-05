
import { _decorator, Component, Node, Vec2, RigidBody2D, Prefab } from 'cc';
import { Enemy } from '../Base/Enemy';
import { EVENT_TYPE } from '../Base/Enums';
import { Singleton } from '../Base/Singleton';
import { Storm } from '../Bullet/Storm';
import { CameraManager } from '../Camera/CameraManager';
import { PLAYER_CONFIG, PLAYER_INIT_SPEED } from '../Configs/Configs';
import { SpwanManager } from '../Enemys/SpwanManager';
import { JIngyantiao } from '../Item/JIngyantiao';
import { PlayerManager } from '../Player/PlayerManager';
import { PlayerStateMachine } from '../Player/PlayerStateMachine';
import { RockerManager } from '../Rocker/RockerManager';
const { ccclass, property } = _decorator;

@ccclass('Datamanager')
export class Datamanager extends Singleton {
    // 经验条
    jingyantiao: JIngyantiao = null;
    // 钻石吸收的距离
    zuanshiXishouLen: number = 20;
    // 当前经验
    _currentEx: number = 0;
    // 升级所需经验
    maxEx: number = 100;
    // 当前玩家等级
    currentLv: number = 0;
    // 每个钻石获得经验
    zuanshiEx: number = 20;

    // 玩家
    Player: PlayerManager = null;
    // 玩家摄像机控制器
    CameraManager: CameraManager = null;
    // 玩家prefab 
    PlayerPrefab: Prefab = null;
    // 摇杆控制器
    Rocker: RockerManager = null;
    // 根节点
    RootNode: Node = null;
    // 刷怪控制器
    SpwanManager: SpwanManager = null;
    // 当前在视野内的敌人
    // 方便攻击
    EnemyInView: Array<Enemy> = new Array();
    // 当前最近的敌人,
    targetEnemy: Enemy = null;

    PlayerFireInternal: number = PLAYER_CONFIG.PLAYER_FIRE_INTERNAL;

    fsm: PlayerStateMachine = null;

    _PlyaerVelocity: Vec2 = new Vec2();
    _PlayerCurrentSpeed: number = PLAYER_INIT_SPEED;

    Prefabs: Prefab[] = new Array();

    static get Instance() {
        return super.getInstance<Datamanager>();
    }

    set currentEx(newEx: number) {
        this.currentEx = newEx;
        // 经验条render逻辑
    }

    get currentEx() {
        return this._currentEx;
    }


    set PlyaerVelocity(newVelocity: Vec2) {
        this._PlyaerVelocity = newVelocity;
    }
    // 增加当前视野内的敌人
    pushEnemyInView(newEnemy: Enemy) {
        if (this.EnemyInView.findIndex(i => i._enemyId === newEnemy._enemyId) > -1) {
            return;
        }
        this.EnemyInView.push(newEnemy);
    }
    // 减少视野内的敌人
    removeEnemyInView(enemyId: number) {

        const index = this.EnemyInView.findIndex(i => i._enemyId === enemyId)
        if (index > -1) {
            this.EnemyInView.splice(index, 1)
        }
    }

}
