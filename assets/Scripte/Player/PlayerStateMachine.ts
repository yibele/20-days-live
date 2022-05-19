import { _decorator, Component, Node } from 'cc';
import { PARAMS_ENUM_TYPE, STATE_ENUM_TYPE } from '../Base/Enums';
import { IPrams } from '../Base/Interfaces';
import { State } from '../Base/State';
import { IdleState } from './State/IdleState';
const { ccclass, property } = _decorator;

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends Component {

    private _params: Map<string, IPrams> = new Map();
    private _states: Map<string, State> = new Map();
    private _currentState: State = null;

    get curretnState() {
        return this._currentState;
    }

    set currentState(newState: State) {
        this._currentState = newState;
        this.run();
    }

    init() {
        this.initPrams();
        this.initState();
        this._currentState = this._states.get(STATE_ENUM_TYPE.IDLE)
    }

    initPrams() {
        this._params.set(STATE_ENUM_TYPE.IDLE, { type: PARAMS_ENUM_TYPE.TRIGER, value: true })
        this._params.set(STATE_ENUM_TYPE.RUN, { type: PARAMS_ENUM_TYPE.TRIGER, value: false })
    }

    initState() {
        this._states.set(STATE_ENUM_TYPE.IDLE, new IdleState(STATE_ENUM_TYPE.IDLE))
        this._states.set(STATE_ENUM_TYPE.RUN, new IdleState(STATE_ENUM_TYPE.RUN))

    }

    setParams(paramName: STATE_ENUM_TYPE, value: boolean | number) {
        this._params.get(paramName).value = value;
        this.run();
    }

    run() {
        switch (this._currentState) {
            case this._states.get(STATE_ENUM_TYPE.IDLE):
                if (this._params.get(STATE_ENUM_TYPE.RUN).value) {
                    this.currentState = this._states.get(STATE_ENUM_TYPE.RUN)
                }
                console.log('idle')
                break;
            case this._states.get(STATE_ENUM_TYPE.RUN):
                if (this._params.get(STATE_ENUM_TYPE.IDLE).value) {
                    this.currentState = this._states.get(STATE_ENUM_TYPE.IDLE)
                }
                console.log('run')
            default:
                // this.currentState = this._states.get(STATE_ENUM_TYPE.IDLE)
                break;
        }
    }
}

