import { _decorator, Component, Node, Animation, AnimationClip } from 'cc';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { EVENT_TYPE, PLAYER_ANIMATION_ENUM } from './Enums';
const { ccclass, property } = _decorator;

@ccclass('State')
export class State extends Component {

    defualtClip: PLAYER_ANIMATION_ENUM;

    run() {
        Datamanager.Instance.Player.node.getChildByName('body').getComponent(Animation).
            play(this.defualtClip)
        Datamanager.Instance.Player.node.getChildByName('body').getComponent(Animation).on(Animation.EventType.FINISHED, this.resetParams)
    }

    resetParams() {
        EventManger.Instance.emit(EVENT_TYPE.RESET_PARAMS)
    }

}

