
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { CameraManager } from '../Camera/CameraManager';
import { Enemy1 } from '../Enemys/Enemy1';
import { SpwanManager } from '../Enemys/SpwanManager';
import { PlayerManager } from '../Player/PlayerManager';
import { RockerManager } from '../Rocker/RockerManager';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {

    @property(Prefab)
    Player: Prefab;

    @property(Prefab)
    Rocker: Prefab;

    init() {
        this.initPlayer();
        this.initRocker();
        this.initCamera();
        // save rootNode
        Datamanager.Instance.RootNode = this.node;
        // save PlayerPrefab
        Datamanager.Instance.PlayerPrefab = this.Player;
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
        playerManager.init();
        Datamanager.Instance.Player = playerManager;
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

