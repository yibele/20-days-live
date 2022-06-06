
import { _decorator, Component, Node, Prefab, instantiate, EventTouch } from 'cc';
import { CameraManager } from '../Camera/CameraManager';
import { PlayerManager } from '../Player/PlayerManager';
import { RockerManager } from '../Rocker/RockerManager';
import { Datamanager } from '../Runtime/Datamanager';
import { AssetManager } from '../Runtime/AssetManager';
import { SpwanManager } from "../Enemys/SpwanManager"
import { SchudleHandler } from '../SchudleHandler/SchudleHandler';
import { UImanager } from '../Item/UImanager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {

    @property(Prefab)
    Player: Prefab;

    @property(Prefab)
    Rocker: Prefab;

    async init() {
        await this.loadRes();
        this.initPlayer();
        this.initRocker();
        this.initCamera();
        this.generateSpwanManager();
        this.initUImanager();
        // 特效功能
        SchudleHandler.Instance.init();
        // save rootNode
        Datamanager.Instance.RootNode = this.node;
        // save PlayerPrefab
        Datamanager.Instance.PlayerPrefab = this.Player;

    }

    generateSpwanManager() {
        const spwanManager = this.addComponent(SpwanManager)
        spwanManager.init();
    }

    async loadRes() {
        const prefabs = await AssetManager.Intance.loadPrefab('Prefab')
        console.log(prefabs)
        Datamanager.Instance.Prefabs = prefabs;
    }

    initUImanager() {
        const uiManager = new UImanager();
        uiManager.init();
    }

    initCamera() {
        const camera = this.node.getChildByName("PlayerCamera")
        const cameraManager = camera.addComponent(CameraManager)
        cameraManager.init();
        Datamanager.Instance.CameraManager = cameraManager;
    }

    initPlayer() {
        const Player = instantiate(this.Player)
        Player.setParent(this.node)
        const playerManager = Player.addComponent(PlayerManager)
        Datamanager.Instance.Player = playerManager;
        playerManager.init();
    }

    initRocker() {
        const Rocker = instantiate(this.Rocker)
        Rocker.setParent(this.node)
        const rockerManager = Rocker.addComponent(RockerManager);
        rockerManager.init();
        Datamanager.Instance.Rocker = rockerManager;
    }

    start() {
        this.init();
    }
}

