
import { _decorator, Component, Node, Vec2, Prefab } from 'cc';
import { Enemy } from '../Base/Enemy';
import { EVENT_TYPE } from '../Base/Enums';
import { Singleton } from '../Base/Singleton';
import { CameraManager } from '../Camera/CameraManager';
import { PLAYER_CONFIG, PLAYER_INIT_SPEED } from '../Configs/Configs';
import { SpwanManager } from '../Enemys/SpwanManager';
import { JIngyantiao } from '../Item/JIngyantiao';
import { UImanager } from '../Item/UImanager';
import { PlayerManager } from '../Player/PlayerManager';
import { PlayerStateMachine } from '../Player/PlayerStateMachine';
import { RockerManager } from '../Rocker/RockerManager';
import { EventManger } from './EventManger';
const { ccclass, property } = _decorator;

@ccclass('Datamanager')
export class Datamanager extends Singleton {
    // 暂停
    puasTag: boolean = false;
    // 玩家技能相关东西都在Schudlehandler中
    // 经验条
    jingyantiao: JIngyantiao = null;
    // 钻石吸收的距离
    zuanshiXishouLen: number = 20;
    // 当前经验
    _currentEx: number = 0;
    // 升级所需经验
    maxEx: number = 100;
    // 当前玩家等级
    private _currentLv: number = 1;
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

    // 控制其保存
    uiManager: UImanager = null;

    static get Instance() {
        return super.getInstance<Datamanager>();
    }

    get currentLv() {
        return this._currentLv;
    }

    set currentLv(newLv: number) {
        this._currentLv = newLv;
        // 渲染
        this.jingyantiao.label.string = 'LV' + this._currentLv;
    }


    /**
     * 设置当前经验部分内容
     * 当前经验大于升级所需经验的时候，
     * 1、暂停游戏。
     * 2、增加人物等级
     * 3、增加升级所需经验
     * 4、将当前经验设置为零
     * 5、取消所有特效计时器
     * 6、取消刷新怪物计时器
     */
    set currentEx(newEx: number) {
        // 从 Zhuanshi component调用 的
        this._currentEx = newEx;
        const totalBarLen = this.jingyantiao.getBgLen();
        // 如果当前经验大于升级所需经验，那么就升级
        if (this._currentEx >= this.maxEx) {
            // 游戏进行暂停
            this.puasTag = true;
            // 增加人物等级
            this.currentLv++;
            // 提高人物升级所需经验
            this.maxEx = this.maxEx * 1.3
            // 设置当前经验为0
            this.currentEx = 0;
            // 取消所有特效计时器
            EventManger.Instance.emit(EVENT_TYPE.CANCLE_EFFECT_SCHUDLE)
            // 取消生成敌人
            EventManger.Instance.emit(EVENT_TYPE.CANCLE_SPWAN_ENEMY_SCHUDLE)
            // 人物升级，包括更新人物属性
            EventManger.Instance.emit(EVENT_TYPE.PLAYER_UPGRADE)
        }
        // 按照比例设置血条
        const trueBarLen = this._currentEx / this.maxEx * totalBarLen;
        // 如果经验条大于100 的话，那就升级
        // 经验条render逻辑
        this.jingyantiao.setBar(trueBarLen)
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
