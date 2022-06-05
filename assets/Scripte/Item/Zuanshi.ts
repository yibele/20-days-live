import { _decorator, Component, Node, v3, Vec3 } from 'cc';
import { Datamanager } from '../Runtime/Datamanager';
import { ZuanshiManager } from './ZuanshiManager';
const { ccclass, property } = _decorator;

@ccclass('Zuanshi')
export class Zuanshi extends Component {
    // 如果钻石被激活，那么才开始检测碰撞
    activeTag: boolean = false;
    init() {
        this.node.active = true;
        this.node.setParent(Datamanager.Instance.RootNode)
        this.node.setPosition(v3(3000, 3000, 0))
    }

    // 碰撞检测
    update() {
        if (Vec3.distance(Datamanager.Instance.Player.getPlayerPosition(), this.node.getPosition()) < Datamanager.Instance.zuanshiXishouLen && this.activeTag) {
            this.activeTag = false;
            ZuanshiManager.Instance.pushZuanshi(this.node)
        }
    }
}

