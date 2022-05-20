
import { _decorator, Component, Node, Vec2, EventTouch, v2, UITransformComponent, RigidBody2D } from 'cc';
import { EVENT_TYPE } from '../Base/Enums';
import { PlayerManager } from '../Player/PlayerManager';
import { Datamanager } from '../Runtime/Datamanager';
import { EventManger } from '../Runtime/EventManger';
const { ccclass, property } = _decorator;

@ccclass('RockerManager')
export class RockerManager extends Component {

    private joyBar: Node = null;
    private bg: Node = null;
    private _maxDistance: number = 0;
    // values of touch events;
    private _touchStartPos: Vec2 = new Vec2();
    private _disXY: Vec2 = new Vec2();

    private _player: PlayerManager = null;
    private _playerNode: Node = null;
    private _plyaerVelocity: Vec2 = new Vec2();


    init() {
        // register player to script
        this._player = Datamanager.Instance.Player;
        this._playerNode = this._player.node;
        this.joyBar = this.node.getChildByName('JoyBar')
        this.bg = this.node.getChildByName("Bg")
        this._maxDistance = this.bg.getComponent(UITransformComponent).width / 2;

        // band touch event;
        this.joyBar.on(Node.EventType.TOUCH_START, this.touchStart, this)
        this.joyBar.on(Node.EventType.TOUCH_MOVE, this.touchMove, this)
        this.joyBar.on(Node.EventType.TOUCH_END, this.touchEnd, this)
        this.joyBar.on(Node.EventType.TOUCH_CANCEL, this.touchCancel, this)
    }

    touchStart(e: EventTouch) {
        this._touchStartPos = e.getLocation();
    }

    touchMove(e: EventTouch) {
        this._disXY = e.getLocation().subtract(this._touchStartPos)
        this.joyBar.setPosition(this._disXY.x, this._disXY.y, 0)
    }

    touchEnd(e: TouchEvent) {
        this._disXY = v2(0, 0)
        this.joyBar.setPosition(0, 0, 0)
    }

    touchCancel(e: TouchEvent) {
        this._disXY = v2(0, 0)
        this.joyBar.setPosition(0, 0, 0)
    }

    /**
     * set Player velocity
     */
    setPlyaerVelocity() {
    }


    /**
     * fix Plyaer velocity
     */
    fixVelocity() {
        this._plyaerVelocity.x = Datamanager.Instance._PlayerCurrentSpeed / this._maxDistance * this._disXY.x;
        this._plyaerVelocity.y = Datamanager.Instance._PlayerCurrentSpeed / this._maxDistance * this._disXY.y;
    }

    /**
     * set the joybar max distance 
     */
    updateVelocity() {
        if (this._disXY.length() > this._maxDistance) {
            this._disXY.multiply2f(this._maxDistance / this._disXY.length(), this._maxDistance / this._disXY.length())
        }
        this.joyBar.setPosition(this._disXY.x, this._disXY.y)
        // give the _disXY to datamanager to update the speed;
        this.fixVelocity();
        // 触发PLAYER_MOVE事件
        EventManger.Instance.emit(EVENT_TYPE.PLAYER_MOVE, this._plyaerVelocity)
    }

    update() {
        this.updateVelocity();
    }
}

