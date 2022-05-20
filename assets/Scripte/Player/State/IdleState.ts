import { _decorator, Component, Node, Animation, AnimationClip } from 'cc';
import { PLAYER_ANIMATION_ENUM } from '../../Base/Enums';
import { State } from '../../Base/State';
import { Datamanager } from '../../Runtime/Datamanager';
const { ccclass, property } = _decorator;

/**
 * 1、要知道自己的animationClilp
 * 2、要有播放animationClip的能力
 */
@ccclass('IdleState')
export class IdleState extends State {
    constructor() {
        super();
        this.defualtClip = PLAYER_ANIMATION_ENUM.IDLE
    }

}

