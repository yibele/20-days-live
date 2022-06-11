import { _decorator, Component, Node, v3, Vec3 } from 'cc';
import { ZUANSHI_JINGYAN } from '../Configs/Configs';
import { Datamanager } from '../Runtime/Datamanager';
import { ZuanshiManager } from './ZuanshiManager';
const { ccclass, property } = _decorator;

@ccclass('Zuanshi')
export class Zuanshi extends Component {
    // 如果钻石被激活，那么才开始检测碰撞
    activeTag: boolean = false;
    // 每颗钻石的经验
    ex: number = ZUANSHI_JINGYAN;
    init() {
        this.node.active = true;
        this.node.setParent(Datamanager.Instance.RootNode)
        this.node.setPosition(v3(3000, 3000, 0))
    }

    // 获得钻石，即获得经验
    getZuanshi() {
        Datamanager.Instance.currentEx += this.ex;
    }

    // 碰撞检测
    update() {
        if (Vec3.distance(Datamanager.Instance.Player.getPlayerPosition(), this.node.getPosition()) < Datamanager.Instance.HANDE && this.activeTag) {
            this.activeTag = false;
            this.getZuanshi();
            ZuanshiManager.Instance.pushZuanshi(this.node)
        }
    }
}

