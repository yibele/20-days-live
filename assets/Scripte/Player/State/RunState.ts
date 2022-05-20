import { _decorator, Component, Node } from 'cc';
import { PLAYER_ANIMATION_ENUM } from '../../Base/Enums';
import { State } from '../../Base/State';
const { ccclass, property } = _decorator;

@ccclass('RunState')
export class RunState extends State {

    constructor() {
        super();
        this.defualtClip = PLAYER_ANIMATION_ENUM.RUN
    }
}

