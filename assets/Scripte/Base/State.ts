import { _decorator, Component, Node, Animation } from 'cc';
import { Datamanager } from '../Runtime/Datamanager';
const { ccclass, property } = _decorator;

@ccclass('State')
export class State extends Component {
    constructor(private clipName: string) {
        super();
    }

    run() {
        Datamanager.Instance.Player.getComponent(Animation).play(this.name)
    }

}

