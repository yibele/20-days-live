
import { _decorator, Component, Node, Vec2, RigidBody2D, Prefab } from 'cc';
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

    Player: PlayerManager = null;
    CameraManager: CameraManager = null;
    PlayerPrefab: Prefab = null;
    Rocker: RockerManager = null;
    RootNode: Node = null;
    SpwanManager: SpwanManager = null;
    _PlyaerVelocity: Vec2 = new Vec2();
    _PlayerCurrentSpeed: number = PLAYER_INIT_SPEED;

    Prefabs: Prefab[] = new Array();

    static get Instance() {
        return super.getInstance<Datamanager>();
    }

    set PlyaerVelocity(newVelocity: Vec2) {
        this._PlyaerVelocity = newVelocity;
        EventManger.Instance.emit(EVENT_TYPE.PLAYER_MOVE, this._PlyaerVelocity)
    }
}
