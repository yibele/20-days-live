import { _decorator, Component, Node, UITransformComponent } from 'cc';
import { Effect } from '../Base/Effect';
import { Datamanager } from '../Runtime/Datamanager';
import { SchudleHandler } from '../SchudleHandler/SchudleHandler';
const { ccclass, property } = _decorator;

@ccclass('Spell')
export class Spell extends Effect {


    init(exitTime: number) {
        const range = SchudleHandler.Instance.spellRange
        this.node.getComponent(UITransformComponent).setContentSize(range, range)
        this.scheduleOnce(this.destroyNode, exitTime)
    }

    /**
     * 隐藏node
     */
    destroyNode() {
        SchudleHandler.Instance._spell = null;
        this.node.destroy();
    }

    setPosition() {
        this.node.setPosition(Datamanager.Instance.Player.getPlayerPosition())
    }

    update() {
        this.setPosition();
    }


}

