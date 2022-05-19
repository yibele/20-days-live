
import { _decorator, Component, Node, Vec2, RigidBody2D, Prefab } from 'cc';
import { Enemy } from '../Base/Enemy';
import { EVENT_TYPE } from '../Base/Enums';
import { Singleton } from '../Base/Singleton';
import { CameraManager } from '../Camera/CameraManager';
import { PLAYER_INIT_SPEED } from '../Configs/Configs';
import { SpwanManager } from '../Enemys/SpwanManager';
import { PlayerManager } from '../Player/PlayerManager';
import { RockerManager } from '../Rocker/RockerManager';
import { EventManger } from './EventManger';
const { ccclass, property } = _decorator;

@ccclass('Datamanager')
export class Datamanager extends Singleton {

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
    // 当前可以刷新的敌人
    CurrentEnemys: Array<string> = new Array();
    // 当前在视野内的敌人
    // 方便攻击
    EnemyInView: Array<Enemy> = new Array();


    _PlyaerVelocity: Vec2 = new Vec2();
    _PlayerCurrentSpeed: number = PLAYER_INIT_SPEED;

    Prefabs: Prefab[] = new Array();

    static get Instance() {
        return super.getInstance<Datamanager>();
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
