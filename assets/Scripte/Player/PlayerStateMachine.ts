import { _decorator, Component, Node } from 'cc';
import { PARAMS_ENUM_TYPE, STATE_ENUM_TYPE } from '../Base/Enums';
import { IPrams } from '../Base/Interfaces';
import { State } from '../Base/State';
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
    }

    get currentState() {
        return this._currentState;
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
}

