import { _decorator, Component, Node, Animation, AnimationClip } from 'cc';
import { PlayerStateMachine } from '../Player/PlayerStateMachine';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { EVENT_TYPE, PLAYER_ANIMATION_ENUM } from './Enums';
const { ccclass, property } = _decorator;

@ccclass('State')
export class State extends Component {

    defualtClip: PLAYER_ANIMATION_ENUM;
    fsm: PlayerStateMachine;
    aniComponent: Animation;

    constructor() {
        super();
        this.init();
    }

    init() {
        this.aniComponent = Datamanager.Instance.Player.getComponentsInChildren(Animation)[0]
        this.aniComponent.on(Animation.EventType.LASTFRAME, this.resetParams, this)
    }


    run() {
        this.aniComponent.crossFade(this.defualtClip, 0.2)

    }

    resetParams() {
        EventManger.Instance.emit(EVENT_TYPE.RESET_PARAMS)
    }

}

