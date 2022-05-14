
import { _decorator, Component, Node, instantiate } from 'cc';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

@ccclass('AbstracObject')
export abstract class AbstracObject extends Component {

    createObejct(objectName: string) {
        const prefab = Datamanager.Instance.Prefabs.find(i => i.name === objectName)
        const Node = instantiate(prefab)
        this.node = Node;
        this.init();
    }
    abstract init(): void;
}
