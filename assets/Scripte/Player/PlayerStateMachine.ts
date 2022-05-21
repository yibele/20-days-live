import { _decorator, Component, Node } from 'cc';
import { EVENT_TYPE, PARAMS_ENUM_TYPE, STATE_ENUM_TYPE } from '../Base/Enums';
import { IPrams } from '../Base/Interfaces';
import { State } from '../Base/State';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
import { IdleState } from './State/IdleState';
import { RunState } from './State/RunState';

const { ccclass, property } = _decorator;

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends Component {

    private _params: Map<string, IPrams> = new Map();
    private _states: Map<string, State> = new Map();

    private _currentState: State = null;

    init() {
        this.initState();
        this.initParams();
        this.currentState = this._states.get(STATE_ENUM_TYPE.IDLE)
        // 保存fsm
        Datamanager.Instance.fsm = this;
        // 动画播放完成之后再resetPrams， 这个在State类中调用
        EventManger.Instance.on(EVENT_TYPE.RESET_PARAMS, this.resetParams, this)
    }

    get currentState() {
        return this._currentState;
    }

    resetParams() {
        this._params.forEach(i => i.value = false)
    }

    setParamsTure(name: string) {
        if (this._params.get(name).value === false) {
            this._params.get(name).value = true;
            this.run();
        }
    }


    set currentState(newState: State) {
        this._currentState = newState;
        this._currentState.run();
    }

    initState() {
        // 玩家有两个状态，
        // 1、run
        // 2、Idle
        this._states.set(STATE_ENUM_TYPE.IDLE, new IdleState());
        this._states.set(STATE_ENUM_TYPE.RUN, new RunState());
    }

    initParams() {
        this._params.set(STATE_ENUM_TYPE.IDLE, {
            type: PARAMS_ENUM_TYPE.TRIGER,
            value: true
        })
        this._params.set(STATE_ENUM_TYPE.RUN, {
            type: PARAMS_ENUM_TYPE.TRIGER,
            value: false
        })
    }

    run() {
        switch (this._currentState) {
            case this._states.get(STATE_ENUM_TYPE.IDLE):
            case this._states.get(STATE_ENUM_TYPE.RUN):
                if (this._params.get(STATE_ENUM_TYPE.IDLE).value) {
                    this.currentState = this._states.get(STATE_ENUM_TYPE.IDLE)
                } else if (this._params.get(STATE_ENUM_TYPE.RUN).value) {
                    this.currentState = this._states.get(STATE_ENUM_TYPE.RUN)
                }
                break;
            default:
                break;
        }
    }
}

