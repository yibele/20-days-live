
import { _decorator, Component, Node, Camera } from 'cc';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;



@ccclass('CameraManager')
export class CameraManager extends Component {
    Player: Node = null;

    init() {
        this.Player = Datamanager.Instance.Player.node;
    }

    lateUpdate() {
        this.node.setPosition(this.Player.getPosition().x, this.Player.getPosition().y, 500)
    }
}
