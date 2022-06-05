import { _decorator, Component, Node, Label, UITransformComponent } from 'cc';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

@ccclass('JIngyantiao')
export class JIngyantiao extends Component {
    @property(Label)
    label: Label = null;
    @property(Node)
    bar: Node = null;

    barSize: number;

    start() {
        this.init();
    }

    init() {
        this.bar.getComponent(UITransformComponent).setContentSize(0, 25)
        this.barSize = this.node.getComponent(UITransformComponent).width;
        Datamanager.Instance.jingyantiao = this;
    }

    // 获得经验值后，设置bar的大小
    setBar(ex: number) {
        this.bar.getComponent(UITransformComponent).setContentSize(ex, 25)
    }
}

